import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [oneWay, setOneWay] = useState(false);
    const [nonStop, setNonStop] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({
            departureCity,
            arrivalCity,
            departureDate,
            returnDate,
            oneWay,
            nonStop,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="departureCity" className="block text-leather-950">Departure City:</label>
                <input
                    type="text"
                    id="departureCity"
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="arrivalCity" className="block text-leather-950">Arrival City:</label>
                <input
                    type="text"
                    id="arrivalCity"
                    value={arrivalCity}
                    onChange={(e) => setArrivalCity(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="departureDate" className="block text-leather-950">Departure Date:</label>
                <input
                    type="date"
                    id="departureDate"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="returnDate" className="block text-leather-950">Return Date:</label>
                <input
                    type="date"
                    id="returnDate"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    disabled={oneWay}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
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
            <button type="submit" className="w-full px-3 py-2 bg-leather-950 text-white rounded-md">Search</button>
        </form>
    );
};


const SearchResults = ({ results }) => {
    return (
        <div className="mt-4">
            {results.length > 0 ? (
                <ul className="space-y-4">
                    {results.map((result, index) => (
                        <li key={index} className="p-4 bg-white shadow rounded-md">
                            <h2 className="text-xl font-bold text-leather-950">{result.carrier}</h2>
                            <p>Flight Number: {result.number}</p>
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


const SearchFlights = () => {
    const [flights, setFlights] = useState([]);

    const handleSearch = async (params) => {
        const response = await fetch(`/flights/search?${new URLSearchParams(params)}`);
        const data = await response.json();
        setFlights(data);
    };

    return (
        <div>
            <h1>Search for Flights</h1>
            <SearchForm onSearch={handleSearch} />
            <SearchResults results={flights} />
        </div>
    )
};

export default SearchFlights;