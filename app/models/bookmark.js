const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
const dbConfig = require('../../config/database');


const Bookmark = new mongoose.Schema({
  url: {type: String, required: true},
  name: {type: String, required: true},
  folder: {type: String, required: true},

  /* how to use mongoose populate?? user ID for user */

  // {type: mongoose.Schema.Types.ObjectId, ref:'Folder'}
  // createdAt: {type: Date, required: true},
  // quantity: {type: Number, min: 1, required: true}, /* probably doesn't make sense, what was I thinking?? */
});

Bookmark.plugin(URLSlugs('name'));



module.exports = mongoose.model('Bookmark', Bookmark);
