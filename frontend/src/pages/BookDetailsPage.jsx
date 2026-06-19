import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import axios from 'axios';
import Rating from '../components/Rating';

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Review form state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    const fetchBookAndReviews = async () => {
      try {
        const { data: bookData } = await axios.get(`/api/books/${id}`);
        const { data: reviewData } = await axios.get(`/api/books/${id}/reviews`);
        setBook(bookData);
        setReviews(reviewData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false);
      }
    };

    fetchBookAndReviews();
  }, [id]);

  const addToCartHandler = () => {
    if (book) {
      dispatch(addToCart({ ...book, qty: 1 }));
      navigate('/cart');
    }
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.post(`/api/books/${id}/reviews`, { rating, comment }, config);
      alert('Review submitted successfully!');
      
      // Refresh reviews
      const { data: reviewData } = await axios.get(`/api/books/${id}/reviews`);
      setReviews(reviewData);
      setRating(0);
      setComment('');
    } catch (error) {
      alert(error.response?.data?.message || 'Error submitting review');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return <div className="container" style={{ marginTop: '2rem' }}>Loading...</div>;
  if (!book) return <div className="container"><h2>Book not found</h2><Link to="/" className="btn btn-primary">Go Back</Link></div>;

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <Link to="/" className="btn" style={{ marginBottom: '2rem', border: '1px solid var(--gray)' }}>← Back to Books</Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        <div>
          <img src={book.coverImage} alt={book.title} style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} />
        </div>
        
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>{book.title}</h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>by {book.author}</p>
          <Rating value={book.rating} text={`${book.numReviews} ${book.numReviews === 1 ? 'review' : 'reviews'}`} />
          
          <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', margin: '2rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
              <span>Price:</span>
              <strong style={{ fontSize: '1.5rem' }}>${book.price.toFixed(2)}</strong>
            </div>
            <button onClick={addToCartHandler} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
              Add to Cart
            </button>

            {userInfo && userInfo.isAdmin && (
              <a href={book.fileUrl} target="_blank" rel="noreferrer" className="btn" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '1rem', display: 'block', textAlign: 'center', border: '2px solid #4F46E5', color: '#4F46E5', backgroundColor: 'transparent', fontWeight: 'bold' }}>
                Read Now (Admin Bypass)
              </a>
            )}
          </div>
          
          <div>
            <h3>Description</h3>
            <p style={{ marginTop: '1rem', color: 'var(--gray)', lineHeight: '1.8' }}>{book.description}</p>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '3rem', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Customer Reviews</h2>
        
        {reviews.length === 0 && <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>No reviews yet. Be the first to review this book!</p>}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
          {reviews.map((review) => (
            <div key={review._id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '1.1rem' }}>{review.name}</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>{review.createdAt.substring(0, 10)}</span>
              </div>
              <Rating value={review.rating} />
              <p style={{ marginTop: '1rem', color: 'var(--dark)', lineHeight: '1.6' }}>{review.comment}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Write a Customer Review</h3>
          {userInfo ? (
            <form onSubmit={submitReviewHandler} style={{ backgroundColor: '#f8fafc', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <div className="form-group">
                <label>Rating</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}>
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label>Comment</label>
                <textarea rows="4" value={comment} onChange={(e) => setComment(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}></textarea>
              </div>
              <button type="submit" className="btn btn-primary" disabled={reviewLoading} style={{ marginTop: '1.5rem' }}>
                {reviewLoading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          ) : (
            <p style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
              Please <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>sign in</Link> to write a review.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
