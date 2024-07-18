import React from 'react';

const SearchResults = ({ results }) => {
    return (
        <div className="mt-4">
            {results.length > 0 ? (
                <ul className="space-y-4">
                    {results.map((result, index) => (
                        <li key={index} className="p-4 bg-white shadow rounded-md">
                            <h2 className="text-xl font-bold text-leather-950">{result.flight.carrier}</h2>
                            <p>Flight Number: {result.flight.number}</p>
                            <p>Departure: {result.departure.city}</p>
                            <p>Arrival: {result.arrival.city}</p>
                            <p>Departure Date: {result.departure.date}</p>
                            <p>Return Date: {result.return.date}</p>
                            <p>Price: {result.price.total} {result.price.currency}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-leather-950">No results found.</p>
            )}
        </div>
    );
};

export default SearchResults;
