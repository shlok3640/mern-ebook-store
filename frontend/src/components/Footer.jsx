import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} E-Book Store. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', color: 'var(--gray)', fontSize: '0.875rem' }}>
          Built with MERN Stack
        </p>
      </div>
    </footer>
  );
};

export default Footer;
