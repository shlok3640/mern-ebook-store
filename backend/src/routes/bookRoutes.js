const express = require('express');
const router = express.Router();
const { getBooks, getAdminBooks, getBookById, createBook, updateBook, deleteBook, createBookReview, getBookReviews } = require('../controllers/bookController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getBooks).post(protect, admin, createBook);
router.route('/admin').get(protect, admin, getAdminBooks);
router.route('/:id/reviews').get(getBookReviews).post(protect, createBookReview);
router.route('/:id').get(getBookById).put(protect, admin, updateBook).delete(protect, admin, deleteBook);

module.exports = router;
