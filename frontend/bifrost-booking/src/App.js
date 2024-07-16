import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/flight/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageBookings from './components/admin/ManageBookings';
import ManageFlights from './components/admin/ManageFlights';
import FlightDetails from './components/flight/FlightDetails';
import Search from './components/flight/Search';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-bookings" element={<ManageBookings />} />
        <Route path="/admin/manage-flights" element={<ManageFlights />} />
        <Route path="/flight-details" element={<FlightDetails />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;