import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 rounded-lg shadow-md p-4">
                <div className="md:w-1/2 mb-4 md:mb-0">
                    <h1 className="text-4xl font-bold mb-2">Welcome to Bifröst Booking!</h1>
                    <p className="text-lg mb-4">Book flights seamlessly with our easy-to-use platform.</p>
                    <Link to="/search" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Book a Flight
                    </Link>
                </div>
                <div className="md:w-1/2">
                    {/* Add any image or content here */}
                </div>
            </div>

            {/* Features */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Feature 1 */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-xl font-bold mb-2">Wide Selection of Flights</h3>
                        <p>Find flights to various destinations around the world.</p>
                    </div>
                    {/* Feature 2 */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-xl font-bold mb-2">Secure Booking Process</h3>
                        <p>Book your flights securely.</p>
                    </div>
                    {/* more features as needed */}
                </div>
            </div>

            <div className="mt-8 text-center">
                <h2 className="text-3xl font-bold mb-2">Start Your Journey Today</h2>
                <p className="text-lg mb-4">Sign up now and enjoy exclusive deals!</p>
                <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Home;
