import React from 'react';

const SearchResults = ({ results }) => {
    return (
        <div className="max-w-md mx-auto mt-6 p-4 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4 text-center">Search Results</h2>
            {results.length === 0 ? (
                <p className="text-center text-gray-500">No results found</p>
            ) : (
                <ul>
                    {results.map((result, index) => (
                        <li key={index} className="mb-4 p-4 border-b border-gray-200">
                            <p className="text-sm font-medium">Flight: {result.flightNumber}</p>
                            <p className="text-sm text-gray-700">From: {result.departureCity} - To: {result.arrivalCity}</p>
                            <p className="text-sm text-gray-700">Departure: {result.departureDate}</p>
                            <p className="text-sm text-gray-700">Return: {result.returnDate}</p>
                            <p className="text-sm text-gray-700">Passengers: {result.passengers}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResults;