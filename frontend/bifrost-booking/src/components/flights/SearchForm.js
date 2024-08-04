import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const airportOptions = [
    // US AIRPORTS //
    { value: "JFK", label: "John F. Kennedy International Airport, New York" },
    { value: "LAX", label: "Los Angeles International Airport, Los Angeles" },
    { value: "ORD", label: "O'Hare International Airport, Chicago" },
    { value: "ATL", label: "Hartsfield-Jackson Atlanta International Airport, Atlanta" },
    { value: "DFW", label: "Dallas/Fort Worth International Airport, Dallas/Fort Worth" },
    { value: "DEN", label: "Denver International Airport, Denver" },
    { value: "SFO", label: "San Francisco International Airport, San Francisco" },
    { value: "MIA", label: "Miami International Airport, Miami" },
    { value: "SEA", label: "Seattle-Tacoma International Airport, Seattle" },
    { value: "LAS", label: "McCarran International Airport, Las Vegas" },
    { value: "MCO", label: "Orlando International Airport, Orlando" },
    { value: "CLT", label: "Charlotte Douglas International Airport, Charlotte" },
    { value: "PHX", label: "Phoenix Sky Harbor International Airport, Phoenix" },
    { value: "IAH", label: "George Bush Intercontinental Airport, Houston" },
    { value: "BOS", label: "Boston Logan International Airport, Boston" },
    { value: "MSP", label: "Minneapolis-Saint Paul International Airport, Minneapolis-Saint Paul" },
    { value: "DTW", label: "Detroit Metropolitan Wayne County Airport, Detroit" },
    { value: "PHL", label: "Philadelphia International Airport, Philadelphia" },

    // CANADIAN AIRPORTS //
    { value: "YYZ", label: "Toronto Pearson International Airport, Toronto" },
    { value: "YVR", label: "Vancouver International Airport, Vancouver" },
    { value: "YUL", label: "Montréal-Pierre Elliott Trudeau International Airport, Montreal" },
    { value: "YYC", label: "Calgary International Airport, Calgary" },
    { value: "YEG", label: "Edmonton International Airport, Edmonton" },
    { value: "YOW", label: "Ottawa Macdonald-Cartier International Airport, Ottawa" },
    { value: "YHZ", label: "Halifax Stanfield International Airport, Halifax" },
    { value: "YWG", label: "Winnipeg James Armstrong Richardson International Airport, Winnipeg" },
    { value: "YQB", label: "Québec City Jean Lesage International Airport, Quebec City" },
    { value: "YXE", label: "Saskatoon John G. Diefenbaker International Airport, Saskatoon" },
    { value: "YQR", label: "Regina International Airport, Regina" },
    { value: "YTZ", label: "Billy Bishop Toronto City Airport, Toronto" },
    { value: "YVR", label: "Victoria International Airport, Victoria" },
];

const SearchForm = ({ onSearch }) => {
    const [departureAirport, setDepartureAirport] = useState(null);
    const [arrivalAirport, setArrivalAirport] = useState(null);
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(null);
    const [passengers, setPassengers] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({
            departureAirport: departureAirport?.value,
            arrivalAirport: arrivalAirport?.value,
            departureDate,
            returnDate,
            passengers,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-smoke-950">
                    Departure Airport:
                </label>
                <Select
                    options={airportOptions}
                    value={departureAirport}
                    onChange={setDepartureAirport}
                    placeholder="Select departure airport"
                    className="mt-1"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-smoke-950">
                    Arrival Airport:
                </label>
                <Select
                    options={airportOptions}
                    value={arrivalAirport}
                    onChange={setArrivalAirport}
                    placeholder="Select arrival airport"
                    className="mt-1"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-smoke-950">
                    Departure Date:
                </label>
                <DatePicker
                    selected={departureDate}
                    onChange={setDepartureDate}
                    dateFormat="yyyy/MM/dd"
                    className="mt-1 block w-full px-3 py-2 border border-smoke-400 rounded-md shadow-sm focus:outline-none focus:ring-smoke-500 focus:border-smoke-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-smoke-950">
                    Return Date:
                </label>
                <DatePicker
                    selected={returnDate}
                    onChange={setReturnDate}
                    dateFormat="yyyy/MM/dd"
                    className="mt-1 block w-full px-3 py-2 border border-smoke-400 rounded-md shadow-sm focus:outline-none focus:ring-smoke-500 focus:border-smoke-500"
                    placeholderText="Select a return date"
                    isClearable
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-smoke-950">
                    Passengers:
                </label>
                <input
                    type="number"
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value, 10))}
                    min="1"
                    max="10"
                    className="mt-1 block w-full px-3 py-2 border border-smoke-400 rounded-md shadow-sm focus:outline-none focus:ring-smoke-500 focus:border-smoke-500"
                />
            </div>
            <button
                type="submit"
                className="w-full px-3 py-2 bg-sunrise-500 text-salmon-100 font-medium rounded-md shadow-sm hover:bg-smoke-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smoke-500"
            >
                Search
            </button>
        </form>
    );
};

export default SearchForm;
