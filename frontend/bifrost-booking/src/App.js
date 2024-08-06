import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/Home';
import SettingsPage from './components/pages/Settings';
import Dashboard from './components/pages/dashboard';
import SearchFlights from './components/flights/Search';
import FlightDetails from './components/flights/FlightDetails';
import UserBookings from './components/bookings/UserBookings';
import EditBooking from './components/bookings/EditBooking';
import UpcomingBookings from './components/bookings/UpcomingBookings';
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
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<SearchFlights />} />
        <Route path="/flights/:id" element={<FlightDetails />} />
        <Route path="/bookings" element={<UserBookings />} />
        <Route path="/bookings/:bookingId" element={<EditBooking />} />
        <Route path="/upcoming-bookings" element={<UpcomingBookings />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
