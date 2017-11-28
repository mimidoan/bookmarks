const mongoose = require('mongoose');
// const dbConfig = require('../../config/database');
// const Bookmark = require('./bookmark');
const bcrypt   = require('bcrypt-nodejs');
// const Bookmark = mongoose.model('Bookmark');


// users
// * ues Passport to authenticate users: username and password
// * the bookmark folders associate with their names
const User = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  bookmarks:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bookmark' }]
});

User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);
