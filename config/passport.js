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
        passReqToCallback: true // allows req from router to be passed in (check if a user is logged in or not)
      },
      function(req, username, password, done) {
        if (username) username = username.toLowerCase(); // Use lower-case to avoid case-sensitive matching

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
              // success, return user
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
        passReqToCallback: true // allows req from router to be passed in (check if a user is logged in or not)
      },
      function(req, username, password, done) {
        if (username) {
          username = username.toLowerCase();
        }

        process.nextTick(function() {
          // if user is not logged in:
          if (!req.user) {
            User.findOne({ username: username }, function(err, user) {
              // return any errors
              if (err) {
                console.log("err in process");
                return done(err);
              }

              // check to see if theres already a user with that email/username
              if (user) {
                return done(
                  null,
                  false,
                  req.flash(
                    "registerMessage",
                    "That email or username is already registered."
                  )
                );
              } else {
                // create new user
                const newUser = new User();

                newUser.username = username;
                // only store the hashed password
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
            // user is logged in and already has an account. Ignore signup. (user should log out before making a new account)
            return done(null, req.user);
          }
        });
      }
    )
  );
};
