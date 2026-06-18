import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, BookOpen } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <Link to="/mylibrary" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '600' }}>
                <BookOpen size={20} />
                <span>My Library</span>
              </Link>
              <div className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--dark)', fontWeight: '600' }}>
                <User size={20} />
                <span>{userInfo.name}</span>
              </div>
              <button onClick={logoutHandler} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #ddd', padding: '0.4rem 0.8rem', backgroundColor: 'white' }}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
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
