import React, { useState } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

const Search = () => {
    const [results, setResults] = useState([]);

    const handleSearch = async (searchParams) => {
        try {
            const query = new URLSearchParams(searchParams).toString();
            const response = await fetch(`/api/flights?${query}`);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="max-w-lg w-full">
                <SearchForm onSearch={handleSearch} />
                <SearchResults results={results} />
            </div>
        </div>
    )
};

export default Search;