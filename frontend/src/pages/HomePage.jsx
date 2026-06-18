import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';
import Paginate from '../components/Paginate';

const HomePage = () => {
  const { keyword, pageNumber } = useParams();
  
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let url = `/api/books?pageNumber=${pageNumber || 1}`;
        if (keyword) {
          url += `&keyword=${keyword}`;
        }
        
        const { data } = await axios.get(url);
        
        // Data format has changed from array to object
        setBooks(data.books);
        setPage(data.page);
        setPages(data.pages);
        
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [keyword, pageNumber]);

  return (
    <div className="container">
      <div className="hero">
        <h1>{keyword ? `Search Results for "${keyword}"` : 'Discover Your Next Great Read'}</h1>
        {!keyword && <p>Explore our curated collection of premium e-books and level up your knowledge today.</p>}
      </div>
      
      <h2>{keyword ? 'Results' : 'Featured Books'}</h2>
      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : books.length === 0 ? (
        <p>No books found. Try a different search!</p>
      ) : (
        <>
          <div className="book-grid">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </div>
  );
};

export default HomePage;
