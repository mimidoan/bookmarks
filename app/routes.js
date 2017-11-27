const mongoose = require('mongoose'),
bookmark = require('./models/bookmark'),
dbConfig = require('../config/database'),
user = require('./models/user.js');

mongoose.connect(dbConfig.url);
const Bookmark = mongoose.model('Bookmark');
// const Folder = mongoose.model('Folder');

module.exports = function(app, passport) {

  /* ======================================================
      Regular Route Handlers
  ====================================================== */

  app.get('/', (req, res) => {
    res.redirect('/home');
  });

  app.get('/home', (req, res) => {
    res.render('index');
  });

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
    Handlers for Creating new Bookmarks
  =================================================*/

  app.get('/create', (req, res) => {

    /*
    Ok Bookmarks are meant to be passed into folders, and each Bookmark is meant to have a reference to
    a folder, but I'm still pretty confused about how to Mongoose populate - will get it figured out
    in the next week

    */
    // Folder.find(function(err, fold, count){
    //   folderContainer = fold;
    // });

    //Folder:folderContainer,

    Bookmark.find(function(err, each, count) {
      res.render('create', {
           Bookmark: each
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



  /* ======================================================
      Handlers for Passport
  ====================================================== */


  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.get('/register', (req, res) => {
    res.render('register', { message: req.flash('registerMessage') });
  });

  // app.post('/register', (req, res) => {
  //   // issue a redirect after registration
  //   // redirect to a confirmation page or straight to feed
  //   res.redirect('register');
  // });

  app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/confirm', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
