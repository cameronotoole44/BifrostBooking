import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ results }) => {
    const navigate = useNavigate();

    const handleDetailsClick = (id) => {
        navigate(`/flights/${id}`);
    };

    return (
        <div className="mt-6 p-4 bg-smoke-100 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4 text-center text-smoke-950">Search Results</h2>
            {results.length === 0 ? (
                <p className="text-center text-smoke-500">No results found</p>
            ) : (
                <ul>
                    {results.map((result, index) => (
                        <li key={index} className="mb-4 p-4 border-b border-smoke-200">
                            <p className="text-sm font-medium text-smoke-950">Flight: {result.flightNumber}</p>
                            <p className="text-sm text-smoke-700">From: {result.departureAirport} - To: {result.arrivalAirport}</p>
                            <p className="text-sm text-smoke-700">Departure: {new Date(result.departureTime).toLocaleString()}</p>
                            <p className="text-sm text-smoke-700">Price: ${result.price}</p>
                            <button
                                onClick={() => handleDetailsClick(result.id)}
                                className="mt-2 px-3 py-1 bg-smoke-950 text-smoke-50 font-medium rounded-md shadow-sm hover:bg-smoke-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smoke-500"
                            >
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
};

export default SearchResults;