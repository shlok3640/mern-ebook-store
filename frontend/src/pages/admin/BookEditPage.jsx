import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BookEditPage = () => {
  const { id: bookId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState(0);
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('');
  const [pages, setPages] = useState(0);
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`/api/books/${bookId}`);
        setTitle(data.title);
        setAuthor(data.author);
        setPrice(data.price);
        setCoverImage(data.coverImage);
        setCategory(data.category);
        setPages(data.pages);
        setDescription(data.description);
        setFileUrl(data.fileUrl);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/api/books/${bookId}`, {
        title, author, price, coverImage, category, pages, description, fileUrl
      }, config);

      setUpdateLoading(false);
      navigate('/admin/booklist');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
      setUpdateLoading(false);
    }
  };

  if (loading) return <div className="container" style={{ marginTop: '2rem' }}>Loading Book Data...</div>;
  if (error) return <div className="container" style={{ marginTop: '2rem', color: '#DC2626' }}>{error}</div>;

  return (
    <div className="container" style={{ marginTop: '2rem', maxWidth: '600px' }}>
      <Link to="/admin/booklist" className="btn" style={{ marginBottom: '2rem', display: 'inline-block', border: '1px solid #ddd' }}>
        Go Back
      </Link>
      
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
        <h1 style={{ marginBottom: '2rem' }}>Edit Book</h1>
        
        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Author</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }} />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Price ($)</label>
              <input type="number" step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Pages</label>
              <input type="number" value={pages} onChange={(e) => setPages(Number(e.target.value))} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Cover Image URL</label>
            <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>PDF File URL</label>
            <input type="text" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="5" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}></textarea>
          </div>

          <button type="submit" disabled={updateLoading} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
            {updateLoading ? 'Updating...' : 'Update Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookEditPage;
