const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders, getOrderMetrics } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/metrics').get(protect, admin, getOrderMetrics);

module.exports = router;
