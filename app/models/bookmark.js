const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
const dbConfig = require('../../config/database');


const Bookmark = new mongoose.Schema({
  url: {type: String, required: true},
  name: {type: String, required: true},
  folder: {type: String, required: true},
  // user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }

  // {type: mongoose.Schema.Types.ObjectId, ref:'Folder'}
  // createdAt: {type: Date, required: true},
});

Bookmark.plugin(URLSlugs('name'));



module.exports = mongoose.model('Bookmark', Bookmark);
