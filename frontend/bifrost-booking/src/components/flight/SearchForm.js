import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [oneWay, setOneWay] = useState(false);
    const [nonStop, setNonStop] = useState(false);
    const [maxPrice, setMaxPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({
            departureCity,
            arrivalCity,
            departureDate,
            returnDate,
            oneWay,
            nonStop,
            maxPrice
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Existing form fields */}
            {/* New form fields for additional parameters */}
            <div>
                <label htmlFor="oneWay" className="block text-leather-950">One Way:</label>
                <input
                    type="checkbox"
                    id="oneWay"
                    checked={oneWay}
                    onChange={(e) => setOneWay(e.target.checked)}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="nonStop" className="block text-leather-950">Non-Stop:</label>
                <input
                    type="checkbox"
                    id="nonStop"
                    checked={nonStop}
                    onChange={(e) => setNonStop(e.target.checked)}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="maxPrice" className="block text-leather-950">Max Price:</label>
                <input
                    type="number"
                    id="maxPrice"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <button type="submit" className="w-full px-3 py-2 bg-leather-950 text-white rounded-md">Search</button>
        </form>
    );
};

export default SearchForm;