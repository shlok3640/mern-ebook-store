import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Download } from 'lucide-react';

const MyLibraryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('/api/orders/myorders', config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [userInfo, navigate]);

  // Flatten the order items from all orders into a single array
  const purchasedBooks = orders.flatMap(order => order.orderItems);

  if (loading) return <div className="container" style={{ marginTop: '2rem' }}>Loading your library...</div>;
  if (error) return <div className="container" style={{ marginTop: '2rem', color: '#DC2626' }}>{error}</div>;

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <h1 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <BookOpen size={32} color="var(--primary)" />
        My Library
      </h1>

      {purchasedBooks.length === 0 ? (
        <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
          <h2>Your library is empty</h2>
          <p style={{ color: 'var(--gray)', marginTop: '1rem', marginBottom: '2rem' }}>You haven't purchased any e-books yet.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">Browse Books</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
          {purchasedBooks.map((item, index) => (
            <div key={index} style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
              <img src={item.book.coverImage} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderBottom: '1px solid #eee' }} />
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Author: {item.book.author}</p>
                <div style={{ marginTop: 'auto' }}>
                  <a 
                    href={item.book.fileUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-primary" 
                    style={{ width: '100%', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
                  >
                    <Download size={18} />
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLibraryPage;
