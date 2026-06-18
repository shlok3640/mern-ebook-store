import React from 'react';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  if (pages <= 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
      {[...Array(pages).keys()].map((x) => (
        <Link
          key={x + 1}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/booklist/${x + 1}`
          }
          className={`btn ${x + 1 === page ? 'btn-primary' : ''}`}
          style={{
            padding: '0.5rem 1rem',
            border: x + 1 === page ? 'none' : '1px solid #ddd',
            backgroundColor: x + 1 === page ? 'var(--primary)' : 'white',
            color: x + 1 === page ? 'white' : 'var(--dark)'
          }}
        >
          {x + 1}
        </Link>
      ))}
    </div>
  );
};

export default Paginate;
