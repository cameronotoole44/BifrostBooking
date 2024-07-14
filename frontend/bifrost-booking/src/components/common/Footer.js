import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-rain-950 text-white py-8">
            <div className="container mx-auto flex flex-wrap justify-between">
                <div className="w-full md:w-1/4 mb-4">
                    <h4 className="text-lg text-rain-400 font-bold mb-2">Contact Us</h4>
                    <p className='text-thunder-200'>Email: contact@bifrostbookings.com</p>
                    <p className='text-thunder-200'>Phone: +1-123-456-7890</p>
                </div>


                <div className="w-full md:w-1/4 mb-4">
                    <h4 className="text-lg  font-bold mb-2">Quick Links</h4>
                    <ul>
                        <li><a href="/" className="text-cloud-600 hover:text-salmon-300 transition duration-300">Home</a></li>
                        <li><a href="/search" className="text-cloud-600 hover:text-salmon-300 transition duration-300">Search Flights</a></li>
                        <li><a href="/register" className="text-cloud-600 hover:text-salmon-300 transition duration-300">Register</a></li>
                        <li><a href="/login" className="text-cloud-600 hover:text-salmon-300 transition duration-300">Login</a></li>
                    </ul>
                </div>


                <div className="w-full md:w-1/4 mb-4">
                    <h4 className="text-lg font-bold mb-2">Social Media</h4>
                    <ul>
                        <li><a href="#" target="_blank" className="text-cloud-600 hover:text-salmon-300 transition duration-300">Twitter</a></li>
                        <li><a href="#" target="_blank" className="text-cloud-600 hover:text-salmon-300 transition duration-300">Facebook</a></li>
                        <li><a href="#" target="_blank" className="text-cloud-600 hover:text-salmon-300 transition duration-300">Instagram</a></li>
                        <li><a href="https://github.com/cameronotoole44" className="text-cloud-600 hover:text-salmon-300 transition duration-300">GitHub</a></li>
                    </ul>
                </div>

                <div className="w-full md:w-1/4 mb-4 text-center text-salmon-300 md:text-right">
                    <p>&copy; {new Date().getFullYear()} Bifröst Bookings. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
};

export default Footer;