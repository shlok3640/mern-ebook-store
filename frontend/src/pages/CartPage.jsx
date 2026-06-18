import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/checkout');
  };

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <h2>Your cart is empty</h2>
          <p style={{ marginTop: '1rem', color: 'var(--gray)', marginBottom: '2rem' }}>Looks like you haven't added any e-books yet.</p>
          <Link to="/" className="btn btn-primary">Start Browsing</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Cart Items List */}
          <div>
            {cartItems.map((item) => (
              <div key={item._id} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', boxShadow: 'var(--shadow-sm)' }}>
                <img src={item.coverImage} alt={item.title} style={{ width: '80px', borderRadius: '4px', marginRight: '1.5rem' }} />
                <div style={{ flexGrow: 1 }}>
                  <Link to={`/book/${item._id}`} style={{ fontWeight: '700', fontSize: '1.1rem' }}>{item.title}</Link>
                  <div style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Digital E-Book</div>
                </div>
                <div style={{ fontWeight: '800', fontSize: '1.25rem', marginRight: '2rem' }}>
                  ${item.price.toFixed(2)}
                </div>
                <button onClick={() => removeFromCartHandler(item._id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
                  <Trash2 size={24} />
                </button>
              </div>
            ))}
          </div>
          
          {/* Cart Summary */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', alignSelf: 'start' }}>
            <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Order Summary</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
              <span>Subtotal ({cartItems.reduce((acc, item) => acc + 1, 0)} items):</span>
              <strong>${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</strong>
            </div>
            
            <button 
              type="button" 
              className="btn btn-primary" 
              disabled={cartItems.length === 0} 
              onClick={checkoutHandler}
              style={{ width: '100%', padding: '1rem', marginTop: '1.5rem', fontSize: '1.1rem' }}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
