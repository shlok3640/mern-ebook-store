const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
const createPaymentIntent = async (req, res) => {
  const { items } = req.body;

  // Calculate order total on the server to prevent manipulation
  // Assuming items array contains full book objects for simplicity, 
  // normally you'd fetch from DB by ID here to be totally secure.
  const calculateOrderAmount = (items) => {
    return items.reduce((acc, item) => acc + item.price, 0) * 100; // Stripe expects cents
  };

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'usd',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createPaymentIntent };
