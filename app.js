/***************************************************************************
*           DEPLOYED: https://ourbookmarksproject.herokuapp.com/           *
****************************************************************************/

/* ======================================================
    Dependencies
====================================================== */

const express = require('express'),
  hbs = require('hbs'),
  mongoose = require('mongoose'),
  db = require('./db.js');

// const drop = require("./bundle.js");


const app = express();

// Set Scaffolding to hbs
app.set('view engine', 'hbs');

// register Mongoose models in app.js
const Bookmark = mongoose.model('Bookmark');
const Folder = mongoose.model('Folder');

/* ======================================================
    Middle Ware
====================================================== */

// Link All Files In Public Directory
app.use(express.static('public'))

// Express Body Parser
app.use(express.urlencoded({ extended: false }));



/* ======================================================
    Route Handlers
====================================================== */
app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

// app.post('/register', (req, res) => {
//   // issue a redirect after registration
//   // redirect to a confirmation page or straight to feed
//   res.redirect('register');
// });

app.get('/feed', (req, res) => {
  res.render('feed');
});

app.get('/confirm', (req, res) => {
  res.render('confirm');
});

app.get('/user', (req, res) => {
  res.render('user');
});

/*================================================
  display first bookmark!
=================================================*/

app.get('/create', (req, res) => {

  /*
  Ok Bookmarks are meant to be passed into folders, and each Bookmark is meant to have a reference to
  a folder, but I'm still pretty confused about how to Mongoose populate - will get it figured out
  in the next week

  */
  Folder.find(function(err, fold, count){
    folderContainer = fold;
  });

  Bookmark.find(function(err, each, count) {
    res.render('create', {
        Folder:folderContainer, Bookmark: each
      });

  });



});

app.post('/create', (req, res) => {
  if(req.body['url']) {
    const newBookmark = new Bookmark({
      url: req.body.url,
      name: req.body.name,
      folder: req.body.folder
    }).save(function(err, newSave, count){
        res.redirect('/create');
    });
  }

  if(req.body['newFolder']) {
    const newFolder = new Folder({
      name: req.body.newFolder
    }).save(function(err, newSave, count){
      res.redirect('/create');
    })

  }



});



// will work locally and bind to port on heroku
app.listen(process.env.PORT || 3000);
