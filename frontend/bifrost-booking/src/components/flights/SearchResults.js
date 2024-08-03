import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ results }) => {
    const navigate = useNavigate();

    const handleDetailsClick = (id) => {
        navigate(`/flights/${id}`);
    };

    return (
        <div className="mt-6 p-4 bg-leather-100 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4 text-center text-leather-950">Search Results</h2>
            {results.length === 0 ? (
                <p className="text-center text-gray-500">No results found</p>
            ) : (
                <ul>
                    {results.map((result, index) => (
                        <li key={index} className="mb-4 p-4 border-b border-leather-200">
                            <p className="text-sm font-medium text-leather-950">Flight: {result.flightNumber}</p>
                            <p className="text-sm text-leather-700">From: {result.departureAirport} - To: {result.arrivalAirport}</p>
                            <p className="text-sm text-leather-700">Departure: {new Date(result.departureTime).toLocaleString()}</p>
                            <p className="text-sm text-leather-700">Price: ${result.price}</p>
                            <button
                                onClick={() => handleDetailsClick(result.id)}
                                className="mt-2 px-3 py-1 bg-sand-950 text-sand-50 font-medium rounded-md shadow-sm hover:bg-sand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sand-500"
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