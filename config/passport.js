const LocalStrategy = require("passport-local").Strategy;

var User = require("../app/models/user");

module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function(req, username, password, done) {
        if (username) username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
          User.findOne({ username: username }, function(err, user) {
            // if there are any errors, return the error
            if (err) return done(err);

            // if no user is found, return the message
            if (!user) {
              return done(
                null,
                false,
                req.flash('loginMessage', "No user found.")
              );
            }


            if (!user.validPassword(password)) {
              return done(
                null,
                false,
                req.flash('loginMessage', "Oops! Wrong password.")
              );
            } else {
              // all is well, return user
              return done(null, user);
            }

          });
        });
      }
    )
  );

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function(req, username, password, done) {
        if (username) {
          username = username.toLowerCase();
        }
        // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
          // if the user is not already logged in:
          if (!req.user) {
            User.findOne({ username: username }, function(err, user) {
              // if there are any errors, return the error
              if (err) {
                console.log("err in process");
                return done(err);
              }

              // check to see if theres already a user with that email
              if (user) {
                return done(
                  null,
                  false,
                  req.flash(
                    "registerMessage",
                    "That email or username is already registered."
                  )
                );
              }else {
                // create the user
                const newUser = new User();

                newUser.username = username;
                newUser.password = newUser.generateHash(password);
                newUser.email = req.body["email"];

                newUser.save(function(err) {
                  if (err) return done(err);

                  return done(null, newUser);
                });
              }
            });
            // if the user is logged in but has no local account...
          } else {
            // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
            return done(null, req.user);
          }
        });
      }
    )
  );
};
