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

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req, res) => {
  const book = new Book({
    title: 'Sample Book',
    author: 'Sample Author',
    description: 'Sample description',
    price: 0,
    coverImage: '/images/sample.jpg',
    category: 'Sample Category',
    pages: 0,
    fileUrl: '/mock-pdfs/sample.pdf'
  });

  const createdBook = await book.save();
  res.status(201).json(createdBook);
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = async (req, res) => {
  const { title, author, description, price, coverImage, category, pages, fileUrl } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.price = price || book.price;
    book.coverImage = coverImage || book.coverImage;
    book.category = category || book.category;
    book.pages = pages || book.pages;
    book.fileUrl = fileUrl || book.fileUrl;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await book.deleteOne();
    res.json({ message: 'Book removed' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };
