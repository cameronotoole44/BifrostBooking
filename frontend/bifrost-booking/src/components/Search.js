import React, { useState } from 'react';

const Search = () => {
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [passengers, setPassengers] = useState(1);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching flights...');
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-rain-300 shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-rain-900">Search Flights</h1>
            <form onSubmit={handleSearch}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-rain-700">Departure City:</label>
                    <input
                        type="text"
                        value={departureCity}
                        onChange={(e) => setDepartureCity(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-rain-400 rounded-md shadow-sm focus:outline-none focus:ring-rain-500 focus:border-rain-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-rain-700">Arrival City:</label>
                    <input
                        type="text"
                        value={arrivalCity}
                        onChange={(e) => setArrivalCity(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-rain-400 rounded-md shadow-sm focus:outline-none focus:ring-rain-500 focus:border-rain-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-rain-700">Departure Date:</label>
                    <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-rain-400 rounded-md shadow-sm focus:outline-none focus:ring-rain-500 focus:border-rain-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-rain-700">Return Date:</label>
                    <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-rain-400 rounded-md shadow-sm focus:outline-none focus:ring-rain-500 focus:border-rain-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-rain-700">Passengers:</label>
                    <input
                        type="number"
                        value={passengers}
                        onChange={(e) => setPassengers(parseInt(e.target.value))}
                        min="1"
                        max="10"
                        className="mt-1 block w-full px-3 py-2 border border-rain-400 rounded-md shadow-sm focus:outline-none focus:ring-rain-500 focus:border-rain-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-3 py-2 bg-thunder-600 text-thunder-50 font-medium rounded-md shadow-sm hover:bg-thunder-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-thunder-500">
                    Search
                </button>
            </form>
        </div>
    )
};

export default Search;
