import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CheckoutForm({ cartItems, userInfo, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required', // Avoid automatic redirect so we can save order first
      confirmParams: {
        return_url: `${window.location.origin}/checkout`,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Payment succeeded! Save the order to our database.
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const orderData = {
          orderItems: cartItems.map(item => ({
            book: item._id,
            title: item.title,
            price: item.price
          })),
          totalPrice: cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)
        };

        await axios.post('/api/orders', orderData, config);
        onSuccess();
      } catch (err) {
        setMessage(err.response?.data?.message || 'Error saving order to database');
        setIsLoading(false);
      }
    } else {
       setIsLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className="btn btn-primary"
        style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '1.5rem' }}
      >
        <span id="button-text">
          {isLoading ? "Processing..." : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message" style={{ color: '#DC2626', marginTop: '1rem', textAlign: 'center', fontWeight: '500' }}>{message}</div>}
    </form>
  );
}
