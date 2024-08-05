import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
    const navigate = useNavigate();
    const { flights, loading, error } = useSelector((state) => state.flights);

    const handleDetailsClick = (id) => {
        navigate(`/flights/${id}`);
    };

    if (loading) {
        return <p className="text-center text-smoke-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-smoke-500">Error: {error}</p>;
    }

    return (
        <div className="mt-6 p-4 bg-smoke-100 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4 text-center text-smoke-950">Search Results</h2>
            {flights.length === 0 ? (
                <p className="text-center text-smoke-500">No results found</p>
            ) : (
                <ul>
                    {flights.map((flight) => (
                        <li key={flight.id} className="mb-4 p-4 border-b border-smoke-200">
                            <p className="text-sm font-medium text-smoke-950">Flight: {flight.flightNumber}</p>
                            <p className="text-sm text-smoke-700">From: {flight.departureAirport} - To: {flight.arrivalAirport}</p>
                            <p className="text-sm text-smoke-700">Departure: {new Date(flight.departureTime).toLocaleString()}</p>
                            <p className="text-sm text-smoke-700">Price: ${flight.price}</p>
                            <button
                                onClick={() => handleDetailsClick(flight.id)}
                                className="mt-2 px-3 py-2 bg-sunrise-500 text-white font-medium rounded-md shadow-sm hover:bg-sunrise-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sunrise-500"
                            >
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResults;