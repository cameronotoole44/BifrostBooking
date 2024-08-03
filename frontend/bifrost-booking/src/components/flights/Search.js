import React, { useState } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

const Search = () => {
    const [results, setResults] = useState([]);

    const handleSearch = async (searchParams) => {
        const { departureAirport, arrivalAirport, departureDate, returnDate } = searchParams;
        try {
            const response = await fetch(`http://localhost:5000/flights/search?departureAirport=${departureAirport}&arrivalAirport=${arrivalAirport}&departureDate=${departureDate}&returnDate=${returnDate}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Failed to fetch flights:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-leather-200 p-4">
            <div className="w-full max-w-md p-4 bg-leather-300 shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-leather-950">Search Flights</h1>
                <SearchForm onSearch={handleSearch} />
                <SearchResults results={results} />
            </div>
        </div>
    );
};

export default Search;