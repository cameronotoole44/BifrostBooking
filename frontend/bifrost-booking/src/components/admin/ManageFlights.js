import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageFlights = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await fetch('/api/flights');
                const data = await response.json();
                setFlights(data);
            } catch (error) {
                setError('Failed to fetch flights');
            } finally {
                setLoading(false);
            }
        };

        fetchFlights();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/flights/${id}`, { method: 'DELETE' });
            setFlights(flights.filter(flight => flight.id !== id));
        } catch (error) {
            console.error('Failed to delete flight:', error);
        }
    };

    return (
        <div className="min-h-screen p-8 bg-sand-400">
            <h1 className="text-3xl text-sand-700 font-bold mb-6">Manage Flights</h1>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <div>
                    <button
                        className="bg-sky-500 text-sand-50 py-2 px-4 rounded-md shadow-md hover:bg-sky-600 mb-4"
                        onClick={() => navigate('/admin/add-flight')}
                    >
                        Add New Flight
                    </button>
                    <table className="min-w-full bg-sand-50 shadow-md rounded-md">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Flight Number</th>
                                <th className="py-2 px-4 border-b">Departure</th>
                                <th className="py-2 px-4 border-b">Arrival</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights.map(flight => (
                                <tr key={flight.id}>
                                    <td className="py-2 px-4 border-b">{flight.flightNumber}</td>
                                    <td className="py-2 px-4 border-b">{new Date(flight.departureTime).toLocaleString()}</td>
                                    <td className="py-2 px-4 border-b">{new Date(flight.arrivalTime).toLocaleString()}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            className="bg-sand-300 text-sand-50 py-1 px-2 rounded-md shadow-md hover:bg-sand-300 mr-2"
                                            onClick={() => navigate(`/admin/edit-flight/${flight.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-salmon-500 text-sand-50 py-1 px-2 rounded-md shadow-md hover:bg-red-600"
                                            onClick={() => handleDelete(flight.id)}
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

export default ManageFlights;