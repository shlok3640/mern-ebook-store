import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img src={book.coverImage} alt={book.title} className="book-cover" />
      <div className="book-info">
        <Link to={`/book/${book._id}`}>
          <h3 className="book-title">{book.title}</h3>
        </Link>
        <p className="book-author">by {book.author}</p>
        <div className="book-footer">
          <span className="book-price">${book.price.toFixed(2)}</span>
          <Link to={`/book/${book._id}`} className="btn btn-primary">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
