import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingBookings } from '../../actions/bookingActions';
import { FaCalendarAlt, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import cloudBackground from '../../assets/images/clouds.jpg';

const UpcomingBookings = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.currentUser?.id);
    const { upcomingBookings = [], loading, error } = useSelector((state) => state.bookings || {});

    useEffect(() => {
        if (userId) {
            dispatch(fetchUpcomingBookings(userId)); // Ensure userId is passed correctly
        }
    }, [dispatch, userId]);

    return (
        <div style={{ backgroundImage: `url(${cloudBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <div className="container bg-cloud-300 mx-auto p-6">
                <h1 className="text-3xl text-cloud-700 font-bold mb-6">Upcoming Bookings</h1>
                {loading && <p>Loading...</p>}
                {error && <p className="text-salmon-500">{error}</p>}
                {upcomingBookings.length === 0 ? (
                    <p>No upcoming bookings found</p>
                ) : (
                    <ul>
                        {upcomingBookings.map((booking) => {
                            const flight = booking.Flight || {};
                            return (
                                <li key={booking.id} className="mb-6 p-4 bg-moss-100 shadow rounded-lg">
                                    <h2 className="text-xl font-bold mb-2">Flight Details</h2>
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
                                    <p className="text-base mb-1">
                                        <FaDollarSign className="inline-block mr-2" />
                                        <span className="font-semibold">Price:</span> {flight.price ? `$${flight.price}` : 'N/A'}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UpcomingBookings;
