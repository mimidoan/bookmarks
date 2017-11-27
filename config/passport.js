const LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

console.log('in passport.js')

module.exports = function(passport) {

  console.log('in function passport.js')


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

    // passport.use('local-login', new LocalStrategy({
    //         // by default, local strategy uses username and password, we will override with email
    //         usernameField : 'email',
    //         passwordField : 'password',
    //         passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    //     },
    //     function(req, email, password, done) {
    //         if (email)
    //             email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
    //
    //         // asynchronous
    //         process.nextTick(function() {
    //             User.findOne({ 'local.email' :  email }, function(err, user) {
    //                 // if there are any errors, return the error
    //                 if (err)
    //                     return done(err);
    //
    //                 // if no user is found, return the message
    //                 if (!user)
    //                     return done(null, false, req.flash('loginMessage', 'No user found.'));
    //
    //                 if (!user.validPassword(password))
    //                     return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
    //
    //                 // all is well, return user
    //                 else
    //                     return done(null, user);
    //             });
    //         });
    //
    //     }));


        // =========================================================================
            // LOCAL SIGNUP ============================================================
            // =========================================================================
            passport.use('local-signup', new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
            },
            function(req, email, password, done) {
              console.log('in local register function');
                if (email) {
                    console.log('if email', email);
                    email = email.toLowerCase();
                }
                   // Use lower-case e-mails to avoid case-sensitive e-mail matching

                // asynchronous
                process.nextTick(function() {
                    // if the user is not already logged in:
                    if (!req.user) {
                        User.findOne({ 'email' :  email }, function(err, user) {
                            // if there are any errors, return the error
                            if (err) {
                              console.log('err in process');
                              return done(err);
                            }


                            // check to see if theres already a user with that email
                            if (user) {
                              console.log('already user with email');
                                return done(null, false, req.flash('registerMessage', 'That email is already registered.'));
                            } else {

                              console.log();

                              //  create the user
                                // const newUser = new User({
                                //   'email': email,
                                //   'password': newUser.generateHash(password)
                                // });

                                // const newUser  = new User();
                                //
                                // newUser.username    = email;
                                // newUser.password = newUser.generateHash(password);

                                // console.log('email: ', newUser.email, 'passpord', newUser.password);

                                // create the user
                                var newUser            = new User();

                                newUser.email    = email;
                                newUser.password = newUser.generateHash(password);

                                newUser.save(function(err) {
                                    if (err)
                                        return done(err);

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

            }));

          }
