import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('/api/bookings');
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                setError('Failed to fetch bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
            setBookings(bookings.filter(booking => booking.id !== id));
        } catch (error) {
            console.error('Failed to delete booking:', error);
        }
    };

    return (
        <div className="min-h-screen p-8 bg-leather-500">
            <h1 className="text-3xl text-leather-200 font-bold mb-6">Manage Bookings</h1>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <div>
                    <button
                        className="bg-leather-800 text-leather-50 py-2 px-4 rounded-md shadow-md hover:bg-leather-950 mb-4"
                        onClick={() => navigate('/admin/add-booking')}
                    >
                        Add New Booking
                    </button>
                    <table className="min-w-full bg-leather-50 shadow-md rounded-md">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Booking ID</th>
                                <th className="py-2 px-4 border-b">User ID</th>
                                <th className="py-2 px-4 border-b">Flight ID</th>
                                <th className="py-2 px-4 border-b">Booking Date</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td className="py-2 px-4 border-b">{booking.id}</td>
                                    <td className="py-2 px-4 border-b">{booking.userId}</td>
                                    <td className="py-2 px-4 border-b">{booking.flightId}</td>
                                    <td className="py-2 px-4 border-b">{new Date(booking.bookingDate).toLocaleString()}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            className="bg-leather-900 text-leather-50 py-1 px-2 rounded-md shadow-md hover:bg-leather-950 mr-2"
                                            onClick={() => navigate(`/admin/edit-booking/${booking.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-salmon-800 text-salmon-50 py-1 px-2 rounded-md shadow-md hover:bg-salmon-950"
                                            onClick={() => handleDelete(booking.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
};

export default ManageBookings;