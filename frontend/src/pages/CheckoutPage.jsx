import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

// Initialize Stripe outside of component render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/checkout');
    }
    if (cartItems.length === 0 && !success) {
      navigate('/');
    }
  }, [userInfo, navigate, cartItems, success]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const fetchClientSecret = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const res = await axios.post('/api/payments/create-payment-intent', { items: cartItems }, config);
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent", err);
      }
    };
    
    if (cartItems.length > 0) {
      fetchClientSecret();
    }
  }, [cartItems, userInfo]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#4F46E5',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  const handleSuccess = () => {
    setSuccess(true);
    localStorage.removeItem('cartItems');
  };

  if (success) {
    return (
      <div className="container" style={{ marginTop: '4rem', textAlign: 'center' }}>
        <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', maxWidth: '600px', margin: '0 auto' }}>
          <CheckCircle size={64} color="var(--secondary)" style={{ margin: '0 auto', marginBottom: '1.5rem' }} />
          <h1 style={{ marginBottom: '1rem' }}>Payment Successful!</h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Thank you for your purchase. Your e-books are now available to download.
          </p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Order Items */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', alignSelf: 'start' }}>
          <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Order Items</h2>
          {cartItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img src={item.coverImage} alt={item.title} style={{ width: '50px', borderRadius: '4px' }} />
                <span>{item.title}</span>
              </div>
              <strong style={{ alignSelf: 'center' }}>${item.price.toFixed(2)}</strong>
            </div>
          ))}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', fontSize: '1.25rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
            <span>Total:</span>
            <strong>${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</strong>
          </div>
        </div>

        {/* Stripe Payment Element */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', alignSelf: 'start' }}>
          <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Payment Details</h2>
          
          {clientSecret ? (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm cartItems={cartItems} userInfo={userInfo} onSuccess={handleSuccess} />
            </Elements>
          ) : (
            <p>Loading secure payment gateway...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
