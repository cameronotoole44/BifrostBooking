import React, { useState } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

const Search = () => {
    const [results, setResults] = useState([]);

    const handleSearch = (searchData) => {
        console.log('Searching flights with:', searchData);
        // DUMMY RESULT DATA //
        const dummyResults = [
            {
                flightNumber: 'AB123',
                departureCity: searchData.departureCity,
                arrivalCity: searchData.arrivalCity,
                departureDate: searchData.departureDate,
                returnDate: searchData.returnDate,
                passengers: searchData.passengers,
            },

        ];
        setResults(dummyResults);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-leather-200">
            <div className="max-w-md mx-auto mt-10 p-6 bg-leather-300 shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-leather-950">Search Flights</h1>
                <SearchForm onSearch={handleSearch} />
                <SearchResults results={results} />
            </div>
        </div>
    )
};

export default Search;