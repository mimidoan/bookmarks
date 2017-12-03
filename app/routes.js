const mongoose = require("mongoose"),
  bookmark = require("./models/bookmark"),
  dbConfig = require("../config/database"),
  user = require("./models/user.js");

mongoose.connect(dbConfig.url);
const Bookmark = mongoose.model("Bookmark");
const User = mongoose.model("User");
mongoose.Promise = global.Promise;

module.exports = function(app, passport) {


  /* ======================================================
      Regular Route Handlers
  ====================================================== */

  // redirect to /home by default
  app.get("/", (req, res) => {
    res.redirect("/home");
  });

  app.get("/home", (req, res) => {
    res.render("index");
  });


  // query for all bookmarks and display by latest posted
  app.get("/feed", isLoggedIn, (req, res) => {
    Bookmark.find().sort('-date').exec(function(err, result) {
      res.render("feed", {
           AllBookmarks: result
       });
    });

  });


// confirmation page for Loging in/registration
  app.get("/confirm", isLoggedIn, (req, res) => {
    res.render("confirm", { user: req.user.username });
  });

// search for bookmarks by user
  app.get("/search", isLoggedIn, (req, res) => {

    if(req.query.search) {
      Bookmark.find({user: req.query.search}, function(err, result) {
        if(result.length < 1) {
          req.flash('noneFound', 'No results were found for that Username');
        }
        res.render("search", {bookmark: result, none: req.flash('noneFound')});
      });
    } else {
        res.render("search");
    }
  });

  /*================================================
    Handlers for Creating new Bookmarks
  =================================================*/

  app.get("/create", isLoggedIn, (req, res) => {
    Bookmark.find(function(err, each) {
      res.render("create", {
        Bookmark: each,
        Err: req.flash('create-err')
      });
    });
  });

  app.post("/create", (req, res) => {
    // if the user submits then we a add to our database
    if (req.body["url"]) {
      const newBookmark = new Bookmark({
        url: req.body.url,
        name: req.body.name,
        user: req.user.username
      }).save(function(err, newSave) {
        if (err) {
          // set flash message
          req.flash('create-err', 'There was an error creating your bookmark.');
        }
        // // find user by their ObjectId then push id of new bookmark to bookmarks array
        User.findOneAndUpdate({ _id: req.session.passport.user }, { $push: { bookmarks: newSave } },
          function(err, result) {
            console.log("result", result);
            res.redirect("/feed");
          }
        );
      });
    }
  });


  /* ======================================================
      Handlers for Passport
  ====================================================== */

  app.get("/login", (req, res) => {
    res.render("login", {message: req.flash("loginMessage"), logIn: req.flash('must-log')});
  });

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/confirm", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  app.get("/register", (req, res) => {
    res.render("register", { message: req.flash("registerMessage")});
  });

  app.post(
    "/register",
    passport.authenticate("local-signup", {
      successRedirect: "/confirm", // redirect to the secure profile section
      failureRedirect: "/register", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};

/* ======================================================
    Middleware for checking whether user is logged in
====================================================== */
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, continue
  if (req.isAuthenticated()) {
    return next();
  } else {

    // set flash message then redirect to login
    req.flash('must-log', 'You must log in to access this page');
    res.redirect("/login");
  }
}
