import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../actions/userActions";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/");
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setIsProfileMenuOpen(false);
    };

    // Links for unauthenticated users
    let loginActions = (
        <div className="flex space-x-4">
            <Link
                to="/auth/register"
                className="block text-sky-900 font-medium hover:text-sky-300 py-2 px-4 rounded-md hover:bg-smoke-500"
                onClick={closeMenu}
            >
                Register
            </Link>
            <Link
                to="/auth/login"
                className="block text-sky-900 font-medium hover:text-sky-300 py-2 px-4 rounded-md hover:bg-smoke-500"
                onClick={closeMenu}
            >
                Login
            </Link>
        </div>
    );

    // Links for authenticated users
    if (currentUser) {
        loginActions = (
            <>
                {/* Displaying Settings and Dashboard Links on Mobile and Desktop */}
                <Link
                    to="/settings"
                    className="block text-sky-900 font-medium hover:text-sky-300 py-2 px-4 rounded-md hover:bg-smoke-500"
                    onClick={closeMenu}
                >
                    Settings
                </Link>
                <Link
                    to="/dashboard"
                    className="block text-sky-900 font-medium hover:text-sky-300 py-2 px-4 rounded-md hover:bg-smoke-500"
                    onClick={closeMenu}
                >
                    Dashboard
                </Link>
            </>
        );
    }

    return (
        <nav className="bg-smoke-300 p-4 shadow-lg relative z-50">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/" onClick={closeMenu}>
                        <img src={logo} alt="Bifröst Bookings Logo" className="h-10 w-auto mr-4" />
                    </Link>
                    <Link
                        to="/"
                        className="text-sky-900 text-xl font-bold hover:text-sky-300"
                        onClick={closeMenu}
                    >
                        Bifröst Bookings
                    </Link>
                </div>
                {/* Mobile menu toggle */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-sky-900">
                        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </button>
                </div>
                {/* Menu Links */}
                <div
                    className={`${isOpen
                        ? "absolute top-full right-0 left-0 bg-smoke-400 shadow-lg mt-2 rounded-md w-full md:w-auto"
                        : "hidden md:flex"
                        } md:flex items-center space-x-4 p-4 md:p-0 overflow-y-auto max-h-60 md:max-h-auto`}
                >
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <Link
                            to="/search"
                            className="block text-sky-900 font-medium hover:text-sky-300 py-2 px-4 rounded-md hover:bg-smoke-500"
                            onClick={closeMenu}
                        >
                            Search Flights
                        </Link>
                        {loginActions}
                        {currentUser && (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    closeMenu();
                                }}
                                className="block text-sky-900 font-medium hover:text-sky-300 py-2 px-4 rounded-md hover:bg-smoke-500 text-left"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
                {/* Profile Button for Desktop */}
                {currentUser && (
                    <div className="relative hidden md:block">
                        <button
                            onClick={toggleProfileMenu}
                            className="flex items-center justify-center h-8 w-8 bg-sky-400 text-sky-950 font-bold rounded-full"
                        >
                            {currentUser.firstName[0]}
                            {currentUser.lastName[0]}
                        </button>
                        {isProfileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-smoke-950 text-smoke-50 rounded-md shadow-lg z-10">
                                <Link
                                    to="/settings"
                                    className="block px-4 py-2 hover:text-sky-200 hover:bg-smoke-900"
                                    onClick={closeMenu}
                                >
                                    Settings
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        closeMenu();
                                    }}
                                    className="block px-4 py-2 w-full text-left hover:bg-smoke-900"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
