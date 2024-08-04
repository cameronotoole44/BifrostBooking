import React from 'react';
import { useCurrentUser } from '../../contexts/CurrentUser';
import hammer from '../../assets/images/hammerIcon.png';

const Footer = () => {

    const { currentUser } = useCurrentUser();

    return (
        <footer className="bg-smoke-950 py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center text-center md:text-left">
                <div className="w-full md:w-1/4 mb-8 md:mb-0 flex flex-col items-center md:items-start">
                    <h4 className="text-lg text-moss-200 font-bold mb-2">Contact The Dev</h4>
                    <div className="flex items-center justify-center md:justify-start text-cloud-300 mb-2">
                        <span>The Dev: Cameron</span>
                        <img src={hammer} alt="Hammer Icon" className="ml-2 w-5 h-5" />
                    </div>
                    <p className="text-cloud-300">
                        Email:
                        <a href="mailto:cameronotoole404@gmail.com" className="text-sky-300 hover:text-moss-600 transition duration-300">
                            cameronotoole404@gmail.com
                        </a>
                    </p>
                </div>

                <div className="w-full md:w-1/4 mb-8 md:mb-0 flex flex-col items-center md:items-start">
                    <h4 className="text-lg text-moss-200 font-bold mb-2">Quick Links</h4>
                    <ul className="space-y-1">
                        <li><a href="/" className="text-sky-300 hover:text-moss-600 transition duration-300">Home</a></li>
                        <li><a href="/search" className="text-sky-300 hover:text-sand-400 transition duration-300">Flights</a></li>
                        {currentUser ? (
                            <li><a href="/dashboard" className="text-sky-300 hover:text-moss-600 transition duration-300">Dashboard</a></li>
                        ) : (
                            <>
                                <li><a href="/auth/register" className="text-sky-300 hover:text-moss-600 transition duration-300">Register</a></li>
                                <li><a href="/auth/login" className="text-sky-300 hover:text-moss-600 transition duration-300">Login</a></li>
                            </>
                        )}
                    </ul>
                </div>

                <div className="w-full md:w-1/4 mb-8 md:mb-0 flex flex-col items-center md:items-start">
                    <h4 className="text-lg text-moss-200 font-bold mb-2">Social Media</h4>
                    <ul className="space-y-1">
                        <li><a href="/" className="text-sky-300 hover:text-salmon-500 transition duration-300">Twitter</a></li>
                        <li><a href="/" className="text-sky-300 hover:text-salmon-500 transition duration-300">Facebook</a></li>
                        <li><a href="/" className="text-sky-300 hover:text-salmon-500 transition duration-300">Instagram</a></li>
                        <li><a href="https://github.com/cameronotoole44" className="text-sky-300 hover:text-moss-600 transition duration-300">GitHub</a></li>
                    </ul>
                </div>

                <div className="w-full md:w-1/4 text-sand-300 text-center md:text-right">
                    <p>&copy; {new Date().getFullYear()} Bifröst Bookings. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
