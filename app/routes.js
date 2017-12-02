const mongoose = require("mongoose"),
  bookmark = require("./models/bookmark"),
  dbConfig = require("../config/database"),
  user = require("./models/user.js");

mongoose.connect(dbConfig.url);
const Bookmark = mongoose.model("Bookmark");
const User = mongoose.model("User");

/*
*
* TODO:
*     - add filter by user
*     - add search by name of bookmark
**/

module.exports = function(app, passport) {
  /* ======================================================
      Regular Route Handlers
  ====================================================== */

  app.get("/", (req, res) => {
    res.redirect("/home");
  });

  app.get("/home", (req, res) => {

    User


    res.render("index");
  });

  app.get("/feed", isLoggedIn, (req, res) => {


    User.find(function(err, all) {
      // each Username will be the Key
      const userBookmarks = {};

      // For Each user create an empty Object
      all.map(function(user) {
        // if there is no Key, create one
        if (!userBookmarks[user.username]) {
          userBookmarks[user.username] = [];
        }
        // Add each bookmark object to the userBookmarks object under the user's name
        user["bookmarks"].map(function(mark) {
          Bookmark.find({ _id: mark }, function(err, result) {
            console.log("Bookmark Query RESULT", result);
            userBookmarks[user.username].push(result);
          });
        });


      });

      res.render("feed", {
        AllBookmarks: userBookmarks
      });
    });
  });

  app.get("/confirm", isLoggedIn, (req, res) => {
    // console.log('user', req.user.username);
    // console.log('session', req.session);
    // console.log('passport', req.session.passport);
    // console.log('user', req.session.passport.user);
    res.render("confirm", { user: req.user.username });
  });

  app.get("/search", isLoggedIn, (req, res) => {
    Bookmark.find({name: req.query.name}, function(err, result) {
      console.log(result);
      res.render("search", {bookmark: result});
    });
  });

  /*================================================
    Handlers for Creating new Bookmarks
  =================================================*/

  app.get("/create", isLoggedIn, (req, res) => {
    // console.log('from create', req.user.username);
    // console.log('session', req.session);

    Bookmark.find(function(err, each) {
      res.render("create", {
        Bookmark: each
      });
    });
  });

  app.post("/create", (req, res) => {
    // if the user submits then we a add to our database
    if (req.body["url"]) {
      const newBookmark = new Bookmark({
        url: req.body.url,
        name: req.body.name,
        folder: req.body.folder
      }).save(function(err, newSave) {
        if (err) {
          // TODO: send a flash message
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
