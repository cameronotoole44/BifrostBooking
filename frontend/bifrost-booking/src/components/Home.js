import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './common/Navbar';
import WelcomeGif from '../assets/images/bifrost-bookings.gif';

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between bg-rain-50 rounded-lg shadow-md p-4">
                <div className="md:w-1/2 mb-4 md:mb-0">
                    <h1 className="text-4xl font-bold mb-2 text-rain-900">Welcome to Bifröst Bookings!</h1>
                    <p className="text-lg mb-4 text-rain-700">Book flights seamlessly with our easy-to-use platform.</p>
                    <Link to="/search" className="bg-sky-400 text-thunder-50 hover:bg-sky-600 hover:text-thunder-200 font-bold py-2 px-4 rounded">
                        Book a Flight
                    </Link>
                </div>
                <div className="md:w-1/2">
                    <img src={WelcomeGif} alt="Bifröst Bookings" />
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-rain-900">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-xl font-bold mb-2 text-rain-900">Wide Selection of Flights</h3>
                        <p className="text-rain-700">Find flights to various destinations around the world.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-xl font-bold mb-2 text-rain-900">Secure Booking Process</h3>
                        <p className="text-rain-700">Book your flights securely.</p>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <h2 className="text-3xl font-bold mb-2 text-rain-900">Start Your Journey Today</h2>
                <p className="text-lg mb-4 text-rain-700">Sign up now and enjoy exclusive deals!</p>
                <Link to="/register" className="bg-rain-500 hover:bg-rain-600 text-rain-50 font-bold py-3 px-6 rounded">
                    Sign Up
                </Link>
            </div>
        </div>
    )
};

export default Home;