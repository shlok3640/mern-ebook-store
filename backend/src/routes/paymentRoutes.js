const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/create-payment-intent').post(protect, createPaymentIntent);

module.exports = router;
