import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch("http://localhost:5000/bookings");
                if (!response.ok) {
                    throw new Error("Failed to fetch bookings");
                }
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                setError("Failed to fetch bookings");
            }
        };

        fetchBookings();
    }, []);

    const handleDeleteBooking = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete booking");
            }
            // REMOVE BOOKING FROM STATE //
            setBookings(bookings.filter(booking => booking.id !== bookingId));
        } catch (error) {
            setError("Failed to delete booking");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Your Bookings</h1>
            {error && <p className="text-red-500">{error}</p>}
            {bookings.length === 0 ? (
                <p>No bookings found</p>
            ) : (
                <ul>
                    {bookings.map(booking => {

                        const flight = booking.flight || {};
                        return (
                            <li key={booking.id} className="mb-6 p-4 bg-white shadow rounded-lg">
                                <h2 className="text-xl font-bold mb-2">Flight Details</h2>
                                <p className="text-base mb-1">
                                    <span className="font-semibold">Flight Number:</span> {flight.flightNumber || 'N/A'}
                                </p>
                                <p className="text-base mb-1">
                                    <span className="font-semibold">Airline:</span> {flight.airline || 'N/A'}
                                </p>
                                <p className="text-base mb-1">
                                    <span className="font-semibold">Departure:</span> {flight.departureAirport || 'N/A'} at {flight.departureTime ? new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                                </p>
                                <p className="text-base mb-1">
                                    <span className="font-semibold">Arrival:</span> {flight.arrivalAirport || 'N/A'} at {flight.arrivalTime ? new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                                </p>
                                <p className="text-base mb-1">
                                    <span className="font-semibold">Duration:</span> {flight.duration || 'N/A'}
                                </p>
                                <p className="text-base mb-1">
                                    <span className="font-semibold">Price:</span> ${flight.price ? Number(flight.price).toFixed(2) : 'N/A'}
                                </p>
                                <div className="mt-4 flex space-x-4">
                                    <button
                                        onClick={() => handleDeleteBooking(booking.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        to={`/bookings/${booking.id}`}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
            <Link
                to="/search"
                className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Search Flights
            </Link>
        </div>
    );
};

export default UserBookings;