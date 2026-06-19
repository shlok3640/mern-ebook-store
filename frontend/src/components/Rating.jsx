import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const Rating = ({ value, text }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.5rem 0' }}>
      <div style={{ display: 'flex', color: '#F59E0B' }}>
        {[1, 2, 3, 4, 5].map((index) => (
          <span key={index}>
            {value >= index ? (
              <Star size={18} fill="#F59E0B" />
            ) : value >= index - 0.5 ? (
              <StarHalf size={18} fill="#F59E0B" />
            ) : (
              <Star size={18} color="#D1D5DB" />
            )}
          </span>
        ))}
      </div>
      {text && <span style={{ fontSize: '0.9rem', color: 'var(--gray)', fontWeight: '500' }}>{text}</span>}
    </div>
  );
};

export default Rating;
