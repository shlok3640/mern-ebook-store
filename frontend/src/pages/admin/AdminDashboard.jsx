import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { DollarSign, ShoppingBag, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({ totalRevenue: 0, totalOrders: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get('/api/orders/metrics', config);
        setMetrics(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [userInfo]);

  if (loading) return <div className="container" style={{ marginTop: '2rem' }}>Loading Analytics...</div>;
  if (error) return <div className="container" style={{ marginTop: '2rem', color: '#DC2626' }}>{error}</div>;

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Admin Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        
        {/* Revenue Metric Card */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '4px solid #10B981' }}>
          <div style={{ padding: '1rem', backgroundColor: '#D1FAE5', borderRadius: '50%', color: '#10B981' }}>
            <DollarSign size={32} />
          </div>
          <div>
            <p style={{ color: 'var(--gray)', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Total Revenue</p>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--dark)' }}>${metrics.totalRevenue.toFixed(2)}</h2>
          </div>
        </div>

        {/* Orders Metric Card */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '4px solid #3B82F6' }}>
          <div style={{ padding: '1rem', backgroundColor: '#DBEAFE', borderRadius: '50%', color: '#3B82F6' }}>
            <ShoppingBag size={32} />
          </div>
          <div>
            <p style={{ color: 'var(--gray)', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Paid Orders</p>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--dark)' }}>{metrics.totalOrders}</h2>
          </div>
        </div>

      </div>

      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/admin/booklist" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={20} /> Manage Inventory
          </Link>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
