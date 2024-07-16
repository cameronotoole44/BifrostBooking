import React from 'react';

const SearchResults = ({ results }) => {
    return (
        <div className="max-w-md mx-auto mt-6 p-4 bg-leather-300 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4 text-center text-leather-950">Search Results</h2>
            {results.length === 0 ? (
                <p className="text-center text-leather-700">No results found</p>
            ) : (
                <ul>
                    {results.map((result, index) => (
                        <li key={index} className="mb-4 p-4 border-b border-leather-400">
                            <p className="text-sm font-medium text-leather-950">Flight: {result.flightNumber}</p>
                            <p className="text-sm text-leather-700">From: {result.departureCity} - To: {result.arrivalCity}</p>
                            <p className="text-sm text-leather-700">Departure: {result.departureDate}</p>
                            <p className="text-sm text-leather-700">Return: {result.returnDate}</p>
                            <p className="text-sm text-leather-700">Passengers: {result.passengers}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
};

export default SearchResults;