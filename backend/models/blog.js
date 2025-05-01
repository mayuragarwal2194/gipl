const mongoose = require('mongoose');

const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['heading', 'text', 'image', 'list', 'quote', 'code', 'tip', 'embed', 'paragraph']  // Added 'paragraph' here
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { _id: false });


const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: { type: String, default: 'Admin' },
  image: { type: String }, // Cover image
  summary: { type: String }, // For blog card / meta description
  tags: [{ type: String }],
  content: [contentBlockSchema],
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);