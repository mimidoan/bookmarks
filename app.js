/***************************************************************************
*           DEPLOYED: https://ourbookmarksproject.herokuapp.com/           *
****************************************************************************/

/* ======================================================
    Dependencies
====================================================== */

const express = require('express'),
  hbs = require('hbs'),
  flash = require('connect-flash'),
  passport = require('passport'),
  session = require('express-session'),
  mongoose = require('mongoose'),
  app = express();

  const configDB = require('./config/database.js');
  mongoose.connect(configDB.url);
// const drop = require("./bundle.js");

require('./config/passport')(passport);
/* ======================================================
    Set Scaffolding to hbs
====================================================== */
app.set('view engine', 'hbs');

/* ======================================================
    Middle Ware
====================================================== */

// Link All Files In Public Directory
app.use(express.static('public'))

// Express Body Parser
app.use(express.urlencoded({ extended: false }));

/* ======================================================
  Path to Passport config
====================================================== */

app.use(session({ secret: 'rowrowrowyourboatgently',resave: true,
    saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


/* ======================================================
  import routes
====================================================== */
require('./app/routes.js')(app, passport);


// will work locally and bind to port on heroku
app.listen(process.env.PORT || 3000);
