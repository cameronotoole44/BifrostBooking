import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CurrentUser } from '../../contexts/CurrentUser';

const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(CurrentUser);

    const handleLogout = () => {
        // LOGOUT LOGIC //
        localStorage.removeItem('userInfo');
        setCurrentUser(null);
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
                <Link to="/" className="text-sky-900 text-xl font-bold hover:text-sky-300">
                    Bifröst Bookings
                </Link>
                <div className="flex space-x-4">
                    <Link to="/search" className="text-sky-900 font-bold hover:text-sky-300 py-2 px-4 rounded border border-sky-900 hover:bg-sky-100">
                        Search Flights
                    </Link>
                    {loginActions}
                </div>
            </div>
        </nav>
    )
};

export default Navbar;