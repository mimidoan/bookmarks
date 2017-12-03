const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
const dbConfig = require('../../config/database');


const Bookmark = new mongoose.Schema({
  url: {type: String, required: true},
  name: {type: String, required: true},
  user: {type: String, required: true},
  date: { type: Date, default: Date.now },
});

Bookmark.plugin(URLSlugs('name'));

module.exports = mongoose.model('Bookmark', Bookmark);
