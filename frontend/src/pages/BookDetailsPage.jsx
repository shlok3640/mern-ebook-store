import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import axios from 'axios';

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`/api/books/${id}`);
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const addToCartHandler = () => {
    if (book) {
      dispatch(addToCart({ ...book, qty: 1 }));
      navigate('/cart');
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!book) {
    return (
      <div className="container">
        <h2>Book not found</h2>
        <Link to="/" className="btn btn-primary">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <Link to="/" className="btn" style={{ marginBottom: '2rem', border: '1px solid var(--gray)' }}>
        ← Back to Books
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        <div>
          <img 
            src={book.coverImage} 
            alt={book.title} 
            style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} 
          />
        </div>
        
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>{book.title}</h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>by {book.author}</p>
          
          <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
              <span>Price:</span>
              <strong style={{ fontSize: '1.5rem' }}>${book.price.toFixed(2)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <span>Status:</span>
              <strong style={{ color: 'var(--secondary)' }}>In Stock (Digital)</strong>
            </div>
            
            <button 
              onClick={addToCartHandler} 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            >
              Add to Cart
            </button>
          </div>
          
          <div>
            <h3>Description</h3>
            <p style={{ marginTop: '1rem', color: 'var(--gray)', lineHeight: '1.8' }}>
              {book.description}
            </p>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', color: 'var(--gray)', fontSize: '0.9rem' }}>
            <div><strong>Category:</strong> {book.category}</div>
            <div><strong>Pages:</strong> {book.pages}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
