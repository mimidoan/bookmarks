// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

// users
// * ues Passport to authenticate users: username and password
// * the bookmark folders associate with their names
// const User = new mongoose.Schema({
//   // username provided by authentication plugin
//   // password hash provided by authentication plugin
//   lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }]
// });

const Bookmark = new mongoose.Schema({
  url: {type: String, required: true},
  name: {type: String, required: true},
  folder: {type: String, required: true}
  // {type: mongoose.Schema.Types.ObjectId, ref:'Folder'}
  // createdAt: {type: Date, required: true},
  // quantity: {type: Number, min: 1, required: true}, /* probably doesn't make sense, what was I thinking?? */
});


// Categorization of bookmarks into Folder
// * each Folder must have a related user
// * a Folder can have 0 or more items
const Folder = new mongoose.Schema({
  // user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  name: {type: String, required: true},
  // createdAt: {type: Date, required: true},
  // lastUpdate: {type: Date, required: true},
  bookmarks: [Bookmark]
});


// group of Bookmarks are a folder (can also be single Bookmark)
// * Name of the Bookmark and the associated URL
//


/*

query population


*/



// create Slugs for both BookMarks and Folders
Bookmark.plugin(URLSlugs('name'));
Folder.plugin(URLSlugs('name'));

// register models w/ mongoose!
mongoose.model('Bookmark', Bookmark);
mongoose.model('Folder', Folder);
// mongoose.model('User', User);

// connection string to local instance of MongoDBa
// mongoose.connect('mongodb://localhost/bookmarks');

mongoose.connect('mongodb://mimi:notsecure@ds255265.mlab.com:55265/bookmarks');
