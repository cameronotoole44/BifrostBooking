import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-nightshade-950 p-4 shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-thunder-200 text-xl font-bold">
                    Bifröst Bookings
                </Link>
                <div className="space-x-4">
                    <Link to="/search" className="text-thunder-200 hover:text-sky-300">
                        Search Flights
                    </Link>
                    <Link to="/register" className="text-thunder-200 hover:text-sky-300">
                        Register
                    </Link>
                    <Link to="/login" className="text-thunder-200 hover:text-sky-300">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;
