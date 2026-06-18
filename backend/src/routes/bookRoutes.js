const express = require('express');
const router = express.Router();
const { getBooks, getBookById } = require('../controllers/bookController');

router.route('/').get(getBooks);
router.route('/:id').get(getBookById);

module.exports = router;
