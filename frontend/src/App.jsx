import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import MyLibraryPage from './pages/MyLibraryPage';
import AdminRoute from './components/AdminRoute';
import BookList from './pages/admin/BookList';
import BookEditPage from './pages/admin/BookEditPage';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/mylibrary" element={<MyLibraryPage />} />
          
          {/* Admin Routes */}
          <Route path="" element={<AdminRoute />}>
            <Route path="/admin/booklist" element={<BookList />} />
            <Route path="/admin/book/:id/edit" element={<BookEditPage />} />
          </Route>

          {/* Future Routes: 
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
