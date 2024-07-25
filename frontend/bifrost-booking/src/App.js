import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/Home';
import ProfilePage from './components/pages/Profile';
import SearchFlights from './components/flights/Search';
import CreateBooking from './components/bookings/CreateBooking';
import EditBooking from './components/bookings/EditBooking';
import LoginPage from './components/auth/Login';
import Register from './components/auth/Register';
import Error404 from './components/pages/Error404';
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
        <Route path="/bookings" element={<CreateBooking />} />
        <Route path="/bookings/:bookingId" element={<EditBooking />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </Router>
  )
};

export default App;