import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/Home';
import ProfilePage from './components/pages/Profile';
import FlightsPage from './components/pages/Flights';
import BookingsPage from './components/pages/Bookings';
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
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
      </Routes>
      <Footer />
    </Router>
  )
};

export default App;