import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import FlightsPage from './pages/FlightsPage';
import BookingsPage from './pages/BookingsPage';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact component={HomePage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/flights" component={FlightsPage} />
        <Route path="/bookings" component={BookingsPage} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;