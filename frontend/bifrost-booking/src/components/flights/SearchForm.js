import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [passengers, setPassengers] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ departureCity, arrivalCity, departureDate, returnDate, passengers });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Departure City:</label>
                <input
                    type="text"
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-water focus:border-water"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Arrival City:</label>
                <input
                    type="text"
                    value={arrivalCity}
                    onChange={(e) => setArrivalCity(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-water focus:border-water"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Departure Date:</label>
                <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-water focus:border-water"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Return Date:</label>
                <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-water focus:border-water"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Passengers:</label>
                <input
                    type="number"
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                    min="1"
                    max="10"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-water focus:border-water"
                />
            </div>
            <button
                type="submit"
                className="w-full px-3 py-2 bg-water text-white font-medium rounded-md shadow-sm hover:bg-water-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-water">
                Search
            </button>
        </form>
    );
};

export default SearchForm;