import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/Home';
import ProfilePage from './components/pages/Profile';
import SearchFlights from './components/flights/Search';
import BookingsPage from './components/pages/Bookings';
import LoginPage from './components/pages/Login';
import RegisterPage from './components/pages/Register';
import Navbar from './components/pages/Navbar';
import Footer from './components/pages/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchFlights />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </Router>
  )
};

export default App;