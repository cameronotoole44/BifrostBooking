import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/userActions';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    let loginActions = (
        <div className="flex space-x-4">
            <Link
                to="/auth/register"
                className="text-sky-900 font-bold hover:text-sky-300 py-2 px-4 rounded border border-sky-900 hover:bg-sky-100"
            >
                Register
            </Link>
            <Link
                to="/auth/login"
                className="text-sky-900 font-bold hover:text-sky-300 py-2 px-4 rounded border border-sky-900 hover:bg-sky-100"
            >
                Login
            </Link>
        </div>
    );

    if (currentUser) {
        loginActions = (
            <div className="flex items-center space-x-4">
                <button
                    onClick={handleLogout}
                    className="text-sky-900 font-bold hover:text-sky-300 py-2 px-4 rounded border border-sky-900 hover:bg-sky-100"
                >
                    Logout
                </button>
                <span className="text-sky-900 font-bold">
                    Logged in as {currentUser.firstName} {currentUser.lastName}
                </span>
            </div>
        );
    }

    return (
        <nav className="bg-sand-100 p-4 shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/">
                        <img src={logo} alt="Bifröst Bookings Logo" className="h-10 w-auto mr-4" />
                    </Link>
                    <Link to="/" className="text-sky-900 text-xl font-bold hover:text-sky-300">
                        Bifröst Bookings
                    </Link>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-sky-900">
                        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </button>
                </div>
                <div className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
                    <Link to="/search" className="text-sky-900 font-bold hover:text-sky-300 py-2 px-4 rounded border border-sky-900 hover:bg-sky-100">
                        Search Flights
                    </Link>
                    {currentUser && (
                        <>
                            <Link to="/settings" className="text-sky-900 font-bold hover:text-sky-300 py-2 px-4 rounded border border-sky-900 hover:bg-sky-100">
                                Settings
                            </Link>
                            <Link to="/dashboard" className="text-sky-900 font-bold hover:text-sky-300 py-2 px-4 rounded border border-sky-900 hover:bg-sky-100">
                                Dashboard
                            </Link>
                        </>
                    )}
                    {loginActions}
                </div>
            </div>
        </nav>
    )
};

export default Navbar;