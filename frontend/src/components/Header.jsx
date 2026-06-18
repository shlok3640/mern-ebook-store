import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useSelector } from 'react-redux';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header>
      <div className="container header-content">
        <Link to="/" className="logo">
          E-Book Store
        </Link>
        <nav className="nav-links">
          <Link to="/cart" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingCart size={20} />
            <span>Cart ({cartItems.length})</span>
          </Link>
          {userInfo ? (
            <div className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={20} />
              <span>{userInfo.name}</span>
            </div>
          ) : (
            <Link to="/login" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={20} />
              <span>Sign In</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
