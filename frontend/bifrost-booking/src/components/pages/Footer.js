import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-cloud-950 py-8">
            <div className="container mx-auto flex flex-wrap justify-between">
                <div className="w-full md:w-1/4 mb-4">
                    <h4 className="text-lg text-moss-200 font-bold mb-2">Contact The Dev</h4>
                    <p className='text-cloud-300'>Email: cameronotoole404@gmail.com</p>
                </div>


                <div className="w-full md:w-1/4 mb-4">
                    <h4 className="text-lg text-moss-200  font-bold mb-2">Quick Links</h4>
                    <ul>
                        <li><a href="/" className="text-sky-300 hover:text-moss-600 transition duration-300">Home</a></li>
                        <li><a href="/search" className="text-sky-300 hover:text-sand-400 transition duration-300">Flights</a></li>
                        <li><a href="/auth/register" className="text-sky-300 hover:text-moss-600 transition duration-300">Register</a></li>
                        <li><a href="/auth/login" className="text-sky-300 hover:text-salmon-600 transition duration-300">Login</a></li>
                    </ul>
                </div>


                <div className="w-full md:w-1/4 mb-4">
                    <h4 className="text-lg text-moss-200 font-bold mb-2">Social Media</h4>
                    <ul>
                        <li><a href="/" className="text-sky-300 hover:text-salmon-500 transition duration-300">Twitter</a></li>
                        <li><a href="/" className="text-sky-300 hover:text-salmon-500 transition duration-300">Facebook</a></li>
                        <li><a href="/" className="text-sky-300 hover:text-salmon-500 transition duration-300">Instagram</a></li>
                        <li><a href="https://github.com/cameronotoole44" className="text-sky-300 hover:text-moss-600 transition duration-300">GitHub</a></li>
                    </ul>
                </div>

                <div className="w-full md:w-1/4 mb-4 text-center text-sand-300 md:text-right">
                    <p>&copy; {new Date().getFullYear()} Bifröst Bookings. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
};

export default Footer;