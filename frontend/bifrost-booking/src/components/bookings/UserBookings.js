import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../actions/bookingActions";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import cloudBackground from '../../assets/images/clouds.jpg';

const UserBookings = () => {
    const dispatch = useDispatch();
    const { bookings = [], loading, error } = useSelector(state => state.bookings || {});

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

    return (
        <div
            style={{
                backgroundImage: `url(${cloudBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh'
            }}
            className="flex justify-center items-center"
        >
            <div className="container bg-cloud-300 mx-auto p-6 w-full max-w-4xl">
                <h1 className="text-3xl text-cloud-700 font-bold mb-6 text-center">Bookings</h1>
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-salmon-500 text-center">{error}</p>}
                {bookings.length === 0 ? (
                    <p className="text-center">No bookings found</p>
                ) : (
                    <ul className="space-y-6">
                        {bookings.map(booking => {
                            const flight = booking.flight || {};
                            return (
                                <li key={booking.id} className="p-4 bg-moss-100 shadow rounded-lg text-center">
                                    <h2 className="text-xl text-sky-700 font-bold mb-2">Flight Details</h2>
                                    <p className="text-base mb-1">
                                        <FaCalendarAlt className="inline-block mr-2" />
                                        <span className="font-semibold">Departure Date:</span> {flight.departureTime ? new Date(flight.departureTime).toLocaleDateString() : 'N/A'}
                                    </p>
                                    <p className="text-base mb-1">
                                        <FaMapMarkerAlt className="inline-block mr-2" />
                                        <span className="font-semibold">Departure Airport:</span> {flight.departureAirport || 'N/A'}
                                    </p>
                                    <p className="text-base mb-1">
                                        <FaMapMarkerAlt className="inline-block mr-2" />
                                        <span className="font-semibold">Arrival Airport:</span> {flight.arrivalAirport || 'N/A'}
                                    </p>
                                    <div className="mt-4 flex justify-center space-x-4">
                                        <Link
                                            to={`/bookings/${booking.id}`}
                                            className="px-4 py-2 bg-cloud-900 text-cloud-100 rounded hover:bg-cloud-300"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
                <div className="mt-6 text-center">
                    <Link
                        to="/search"
                        className="inline-block px-4 py-2 bg-cloud-900 text-cloud-50 rounded hover:bg-cloud-400"
                    >
                        Search Flights
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserBookings;