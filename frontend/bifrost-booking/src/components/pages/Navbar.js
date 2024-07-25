import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import { CurrentUser } from '../contexts/CurrentUser';

const Navbar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { currentUser } = useContext(CurrentUser);

    const handleLogout = () => {
        dispatch(logout());
        history.push('/');
    };

    return (
        <nav className="bg-sand-100 p-4 shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-sky-900 text-xl font-bold hover:text-sky-300">
                    Bifröst Bookings
                </Link>
                <div className="space-x-4">
                    <Link to="/search" className="text-sky-900 font-bold hover:text-sky-300">
                        Search Flights
                    </Link>
                    {currentUser ? (
                        <>
                            <Link to="/profile" className="text-sky-900 font-bold hover:text-sky-300">
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sky-900 font-bold hover:text-sky-300"
                            >
                                Logout
                            </button>
                            <span className="text-sky-900 font-bold">
                                Logged in as {currentUser.firstName} {currentUser.lastName}
                            </span>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className="text-sky-900 font-bold hover:text-sky-300">
                                Register
                            </Link>
                            <Link to="/login" className="text-sky-900 font-bold hover:text-sky-300">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
};

export default Navbar;
