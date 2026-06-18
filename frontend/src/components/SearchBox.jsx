import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search books..."
        style={{
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-full) 0 0 var(--radius-full)',
          border: '1px solid #ddd',
          borderRight: 'none',
          outline: 'none',
          width: '250px'
        }}
      />
      <button 
        type="submit" 
        style={{ 
          padding: '0.5rem 1rem', 
          backgroundColor: 'var(--primary)', 
          color: 'white', 
          border: 'none', 
          borderRadius: '0 var(--radius-full) var(--radius-full) 0',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchBox;
