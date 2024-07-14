import React, { useState } from 'react';

const Search = () => {
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [passengers, setPassengers] = useState(1);

    const handleSearch = () => {

        console.log('Searching flights...');
    };

    return (
        <div>
            <h1>Search Flights</h1>
            <form onSubmit={handleSearch}>
                <div>
                    <label>Departure City:</label>
                    <input
                        type="text"
                        value={departureCity}
                        onChange={(e) => setDepartureCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Arrival City:</label>
                    <input
                        type="text"
                        value={arrivalCity}
                        onChange={(e) => setArrivalCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Departure Date:</label>
                    <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Return Date:</label>
                    <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Passengers:</label>
                    <input
                        type="number"
                        value={passengers}
                        onChange={(e) => setPassengers(parseInt(e.target.value))}
                        min="1"
                        max="10"
                    />
                </div>
                <button type="submit">Search</button>
            </form>
        </div>
    )
};

export default Search;