const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  coverImage: { type: String, required: true },
  category: { type: String, required: true },
  pages: { type: Number },
  fileUrl: { type: String },
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
}, {
  timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
