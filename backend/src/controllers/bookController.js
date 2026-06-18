const Book = require('../models/Book');

// @desc    Fetch all books
// @route   GET /api/books
const getBooks = async (req, res) => {
  const books = await Book.find({});
  res.json(books);
};

// @desc    Fetch single book
// @route   GET /api/books/:id
const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

module.exports = { getBooks, getBookById };
