import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, Plus } from 'lucide-react';

const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get('/api/books');
      setBooks(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.delete(`/api/books/${id}`, config);
        fetchBooks(); // Refresh the list
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    }
  };

  const createBookHandler = async () => {
    if (window.confirm('Are you sure you want to create a new sample book?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.post(`/api/books`, {}, config);
        fetchBooks(); // Refresh the list
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    }
  };

  if (loading) return <div className="container" style={{ marginTop: '2rem' }}>Loading Inventory...</div>;
  if (error) return <div className="container" style={{ marginTop: '2rem', color: '#DC2626' }}>{error}</div>;

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Book Inventory (Admin)</h1>
        <button className="btn btn-primary" onClick={createBookHandler} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} /> Create Book
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--dark)' }}>ID</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--dark)' }}>TITLE</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--dark)' }}>AUTHOR</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--dark)' }}>PRICE</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--dark)' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--gray)', fontSize: '0.9rem' }}>{book._id}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{book.title}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--gray)' }}>{book.author}</td>
                <td style={{ padding: '1rem 1.5rem' }}>${book.price.toFixed(2)}</td>
                <td style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem' }}>
                  <button onClick={() => navigate(`/admin/book/${book._id}/edit`)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}>
                    <Edit size={20} />
                  </button>
                  <button onClick={() => deleteHandler(book._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}>
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
