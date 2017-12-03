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

  app.get("/", (req, res) => {
    res.redirect("/home");
  });

  app.get("/home", (req, res) => {
    res.render("index");
  });

  function findThem() {
    const userBookmarks = {};

    User.find(function(err, all) {
      // each Username will be the Key and their values will be all associate bookmark objects

      // maps each user to an empty Object
      all.map(function(user) {
        // if there is no Key, create one
        if (!userBookmarks[user.username]) {
          userBookmarks[user.username] = [];
        }
        // Add each bookmark object to the userBookmarks object under the user's name
        user["bookmarks"].map(function(mark) {
          Bookmark.find({ _id: mark }, function(err, result) {
            //
            // console.log('$$ RESULT: ', result);
            // console.log('$$$$$$$$ URL: ', result[0].url);

            userBookmarks[user.username].push(result);
            // console.log('$$$$$ USERNAME: ', userBookmarks[user.username]);
          });
        });
      });



  });

  return userBookmarks;
}

  app.get("/feed", isLoggedIn, (req, res) => {

    Bookmark.find().sort('-date').exec(function(err, result) {
      res.render("feed", {
           AllBookmarks: result
       });
    });

      //
      //   const p1 = new Promise(function(fulfill, reject) {
      //     const allUsers = findThem();
      //     console.log("allUSERS", allUsers);
      //     fulfill(allUsers);
      // });
      //
      //   p1.then(function(all) {
      //     console.log('ALL', all);
      //     res.render("feed", {
      //         AllBookmarks: all
      //       });
      //   });
      //

      /*********************
       mongoose Promises
      ***********************/

        // const userBookmarks = {};
        // const allUsers = User.find().exec();
        //
        // allUsers.then(function(all) {
        //   all
        //     .map(function(user) {
        //     // if there is no Key, create one
        //     if (!userBookmarks[user.username]) {
        //       userBookmarks[user.username] = [];
        //     }
        //     // Add each bookmark object to the userBookmarks object under the user's name
        //     user["bookmarks"]
        //       .map(function(mark) {
        //         Bookmark.find({ _id: mark }, function(err, result) {
        //           userBookmarks[user.username].push(result);
        //           console.log('$$$$$ USERNAME: ', userBookmarks[user.username]);
        //         });
        //       });
        //   });
        //
        //
        // }).then(function() {
        //   // console.log('$$$$$$ Bookmarks', userBookmarks);
        //   res.render("feed", {
        //     AllBookmarks: userBookmarks
        //   });
        // });


        /*********************

        ***********************/

    //     User.find(function(err, all) {
    //       // each Username will be the Key and their values will be all associate bookmark objects
    //
    //       // maps each user to an empty Object
    //       all.map(function(user) {
    //         // if there is no Key, create one
    //         if (!userBookmarks[user.username]) {
    //           userBookmarks[user.username] = [];
    //         }
    //         // Add each bookmark object to the userBookmarks object under the user's name
    //         user["bookmarks"].map(function(mark) {
    //           Bookmark.find({ _id: mark }, function(err, result) {
    //             userBookmarks[user.username].push(result);
    //           });
    //         });
    //       });
    //
    //
    //       console.log('$$$$$ FINAL: ', userBookmarks);
    //       fulfill(userBookmarks);
    //     });
    //
    //
    // });
    //
    // p.then(function(userBookmarks) {
    //   res.render("feed", {
    //     AllBookmarks: userBookmarks
    //   });
    // });



    /*********************
     Native Promises
    ***********************/
    // const userBookmarks = {};
    //
    // const p1 = new Promise(function(fulfill, reject) {
    //
    //
    //     // find all users
    //     User.find(function(err, all) {
    //       console.log('$$$$$ FINAL: ', userBookmarks);
    //       fulfill(all);
    //     });
    // });

    // const p2 = new Promise(function(fulfill, reject) {
    //   all.map(function(user) {
    //     // if there is no Key, create one
    //     if (!userBookmarks[user.username]) {
    //       userBookmarks[user.username] = [];
    //     }
    //     // Add each bookmark object to the userBookmarks object under the user's name
    //     user["bookmarks"].map(function(mark) {
    //       Bookmark.find({ _id: mark }, function(err, result) {
    //
    //         console.log('$$ RESULT: ', result);
    //         userBookmarks[user.username].push(result);
    //         console.log('$$$$$ USERNAME: ', userBookmarks[user.username]);
    //       });
    //     });
    //   });
    // })

    // Promise.all([p1, p2]).then(function(userBookmarks) {
    //   console.log('$$$$$$$$$ USERBOOKMARKS OBJ $$$$$$$$', userBookmarks);
    //   res.render("feed", {
    //     AllBookmarks: userBookmarks
    //   });
    // });

    // p1
    // .then(function(result){
    //
    //   result.map(function(user) {
    //     // if there is no Key, create one
    //     if (!userBookmarks[user.username]) {
    //       userBookmarks[user.username] = [];
    //     }
    //   });
    //   console.log('$$$$$$$$$ FIRST MAP $$$$$$$$$');
    //
    // })
    // .then(function() {
    //   return new Promise(function() {
    //   Bookmark.find({ user: req.user.username }, function(err, result) {
    //     console.log('$$ RESULT: ', result);
    //     userBookmarks[req.user.username].push(result);
    //     console.log('$$$$$ USERNAME: ', userBookmarks[user.username]);
    //
    //   });
    //
    //   console.log('$$$$$$$$$ AFTER BOOKMARK FIND $$$$$$$$$');
    // });
    // })
    // .then(function() {
    //
    //   console.log('$$$$$$$$ TEST $$$$$$$$$$');
    //   res.render("feed", {
    //       AllBookmarks: userBookmarks
    //     });
    // });



    /*********************
     mongoose Promises
    ***********************/

            //
            //
            // const userBookmarks = {};
            //
            // // find all users
            // User.find(function(err, all) {
            //   // each Username will be the Key and their values will be all associate bookmark objects
            //
            //   // maps each user to an empty Object
            //   all.map(function(user) {
            //     // if there is no Key, create one
            //     if (!userBookmarks[user.username]) {
            //       userBookmarks[user.username] = [];
            //     }
            //     // Add each bookmark object to the userBookmarks object under the user's name
            //     user["bookmarks"].map(function(mark) {
            //       Bookmark.find({ _id: mark }, function(err, result) {
            //
            //         console.log('$$ RESULT: ', result);
            //         console.log('$$$$$$$$ URL: ', result[0].url);
            //
            //         userBookmarks[user.username].push(result);
            //         console.log('$$$$$ USERNAME: ', userBookmarks[user.username]);
            //       });
            //     });
            //   });
            //
            //
            //   console.log('$$$$$ FINAL: ', userBookmarks);
            //   res.render("feed", {
            //       AllBookmarks: userBookmarks
            //     });
            //
            // });



  });

                //  appends http or https to the url of each bookmark obj
                  // const newResult = result.map(function(bookmarkObj) {
                  //
                  //   const url = bookmarkObj.url;
                  //   if(!url.includes('https://') || !url.includes('http://')) {
                  //
                  //   }
                  //
                  // });

  app.get("/confirm", isLoggedIn, (req, res) => {
    res.render("confirm", { user: req.user.username });
  });

  app.get("/search", isLoggedIn, (req, res) => {

    Bookmark.find({user: req.query.name}, function(err, result) {
      let zero = "";
      if(result.length < 1) {
        zero = 'No results were found for that Username';
      }
      res.render("search", {bookmark: result, none: zero});
    });
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
