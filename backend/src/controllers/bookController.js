const Book = require('../models/Book');

// @desc    Fetch all books (Public)
// @route   GET /api/books
const getBooks = async (req, res) => {
  const pageSize = 2; // Fixed to 2 for local testing

  // Defensive input sanitization for pageNumber
  let page = Number(req.query.pageNumber);
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  // Build dynamic query object, ALWAYS excluding archived books for the public
  const query = { category: { $ne: 'ARCHIVED' } };

  if (req.query.keyword) {
    query.$or = [
      { title: { $regex: req.query.keyword, $options: 'i' } },
      { author: { $regex: req.query.keyword, $options: 'i' } }
    ];
  }

  // Assuming your database field is 'category', mapping 'genre' query param to it
  if (req.query.genre) {
    query.category = req.query.genre;
  }

  // Determine sorting
  let sortOption = {};
  if (req.query.sort === 'price-asc') {
    sortOption.price = 1;
  } else if (req.query.sort === 'price-desc') {
    sortOption.price = -1;
  } else if (req.query.sort === 'newest') {
    sortOption.createdAt = -1;
  }

  const count = await Book.countDocuments(query);
  const books = await Book.find(query)
    .sort(sortOption)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ books, page, pages: Math.ceil(count / pageSize) });
};

// @desc    Fetch ALL books including archived (Admin)
// @route   GET /api/books/admin
// @access  Private/Admin
const getAdminBooks = async (req, res) => {
  const pageSize = 10; // Larger page size for admin table
  let page = Number(req.query.pageNumber);
  if (isNaN(page) || page < 1) page = 1;

  const count = await Book.countDocuments({});
  const books = await Book.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ books, page, pages: Math.ceil(count / pageSize) });
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

// @desc    Soft Delete a book (Archive)
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    // SOFT DELETE: We do not use book.deleteOne() to preserve data integrity for orders.
    // Since we cannot alter the schema, we assign the category to a reserved keyword 'ARCHIVED'.
    book.category = 'ARCHIVED';
    await book.save();
    
    res.json({ message: 'Book successfully archived (Soft Delete)' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

module.exports = { getBooks, getAdminBooks, getBookById, createBook, updateBook, deleteBook };
