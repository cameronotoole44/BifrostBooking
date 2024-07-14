import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div>
                    <Link to="/" className="text-white text-xl font-bold">Bifröst Bookings</Link>
                </div>

                {/* Navigation Links */}
                <ul className="flex space-x-4">
                    <li><Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link></li>
                    <li><Link to="/search" className="text-gray-300 hover:text-white transition duration-300">Search Flights</Link></li>
                    <li><Link to="/register" className="text-gray-300 hover:text-white transition duration-300">Register</Link></li>
                    {/* Add more navigation links as needed */}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;