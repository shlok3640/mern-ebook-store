const Order = require('../models/Order');

// @desc    Get sales metrics for admin dashboard
// @route   GET /api/orders/metrics
// @access  Private/Admin
const getOrderMetrics = async (req, res) => {
  const metrics = await Order.aggregate([
    {
      $match: { isPaid: true } // Only calculate paid orders
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
        totalOrders: { $sum: 1 },
      }
    }
  ]);

  res.json(metrics.length > 0 ? metrics[0] : { totalRevenue: 0, totalOrders: 0 });
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      totalPrice,
      isPaid: true, // Mocking payment as successful
      paidAt: Date.now()
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('orderItems.book');
  res.json(orders);
};

module.exports = { addOrderItems, getMyOrders, getOrderMetrics };
