import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { searchFlights } from "../../actions/flightActions";


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
    { value: "YYJ", label: "Victoria International Airport, Victoria" },
];

const passengerOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} ${i === 0 ? 'Passenger' : 'Passengers'}`,
}));

const SearchForm = () => {
    const dispatch = useDispatch();

    const [departureAirport, setDepartureAirport] = useState(null);
    const [arrivalAirport, setArrivalAirport] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [passengerCount, setPassengerCount] = useState(null);
    const [tripType, setTripType] = useState("oneway"); // Added trip type state

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!departureAirport || !arrivalAirport || !departureDate || !passengerCount) {
            alert('Please fill in all required fields.');
            return;
        }

        const searchData = {
            departureAirport: departureAirport.value,
            arrivalAirport: arrivalAirport.value,
            departureDate: departureDate.toISOString(),
            passengerCount: passengerCount.value,
        };

        if (tripType === 'roundtrip' && returnDate) {
            searchData.returnDate = returnDate.toISOString();
        }

        dispatch(searchFlights(searchData));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between">
                <button
                    type="button"
                    className={`px-4 py-2 rounded-md ${tripType === "oneway" ? "bg-cloud-500 text-white" : "bg-white text-cloud-500"
                        }`}
                    onClick={() => setTripType("oneway")}
                >
                    One Way
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 rounded-md ${tripType === "roundtrip" ? "bg-cloud-500 text-white" : "bg-white text-cloud-500"
                        }`}
                    onClick={() => setTripType("roundtrip")}
                >
                    Round Trip
                </button>
            </div>

            <div>
                <label htmlFor="departureAirport" className="block text-sm font-medium text-gray-700">
                    Departure Airport
                </label>
                <Select
                    id="departureAirport"
                    options={airportOptions}
                    value={departureAirport}
                    onChange={setDepartureAirport}
                    placeholder="Select a departure airport"
                    className="mt-1"
                />
            </div>

            <div>
                <label htmlFor="arrivalAirport" className="block text-sm font-medium text-gray-700">
                    Arrival Airport
                </label>
                <Select
                    id="arrivalAirport"
                    options={airportOptions}
                    value={arrivalAirport}
                    onChange={setArrivalAirport}
                    placeholder="Select an arrival airport"
                    className="mt-1"
                />
            </div>

            <div>
                <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">
                    Departure Date
                </label>
                <DatePicker
                    selected={departureDate}
                    onChange={setDepartureDate}
                    dateFormat="yyyy/MM/dd"
                    className="mt-1 block w-full px-3 py-2 border border-smoke-400 rounded-md shadow-sm focus:outline-none focus:ring-smoke-500 focus:border-smoke-500"
                    placeholderText="Select a departure date"
                    isClearable
                />
            </div>

            {tripType === "roundtrip" && (
                <div>
                    <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">
                        Return Date
                    </label>
                    <DatePicker
                        selected={returnDate}
                        onChange={setReturnDate}
                        dateFormat="yyyy/MM/dd"
                        className="mt-1 block w-full px-3 py-2 border border-smoke-400 rounded-md shadow-sm focus:outline-none focus:ring-smoke-500 focus:border-smoke-500"
                        placeholderText="Select a return date"
                        minDate={departureDate}
                        isClearable
                    />
                </div>
            )}

            <div>
                <label htmlFor="passengerCount" className="block text-sm font-medium text-gray-700">
                    Number of Passengers
                </label>
                <Select
                    id="passengerCount"
                    options={passengerOptions}
                    value={passengerCount}
                    onChange={setPassengerCount}
                    placeholder="Select number of passengers"
                    className="mt-1"
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-cloud-500 text-white px-4 py-2 rounded-md hover:bg-cloud-600"
                >
                    Search Flights
                </button>
            </div>
        </form>
    );
};

export default SearchForm;





// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import Select from "react-select";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { searchFlights } from "../../actions/flightActions";

// const airportOptions = [
//     // US AIRPORTS //
//     { value: "JFK", label: "John F. Kennedy International Airport, New York" },
//     { value: "LAX", label: "Los Angeles International Airport, Los Angeles" },
//     { value: "ORD", label: "O'Hare International Airport, Chicago" },
//     { value: "ATL", label: "Hartsfield-Jackson Atlanta International Airport, Atlanta" },
//     { value: "DFW", label: "Dallas/Fort Worth International Airport, Dallas/Fort Worth" },
//     { value: "DEN", label: "Denver International Airport, Denver" },
//     { value: "SFO", label: "San Francisco International Airport, San Francisco" },
//     { value: "MIA", label: "Miami International Airport, Miami" },
//     { value: "SEA", label: "Seattle-Tacoma International Airport, Seattle" },
//     { value: "LAS", label: "McCarran International Airport, Las Vegas" },
//     { value: "MCO", label: "Orlando International Airport, Orlando" },
//     { value: "CLT", label: "Charlotte Douglas International Airport, Charlotte" },
//     { value: "PHX", label: "Phoenix Sky Harbor International Airport, Phoenix" },
//     { value: "IAH", label: "George Bush Intercontinental Airport, Houston" },
//     { value: "BOS", label: "Boston Logan International Airport, Boston" },
//     { value: "MSP", label: "Minneapolis-Saint Paul International Airport, Minneapolis-Saint Paul" },
//     { value: "DTW", label: "Detroit Metropolitan Wayne County Airport, Detroit" },
//     { value: "PHL", label: "Philadelphia International Airport, Philadelphia" },

//     // CANADIAN AIRPORTS //
//     { value: "YYZ", label: "Toronto Pearson International Airport, Toronto" },
//     { value: "YVR", label: "Vancouver International Airport, Vancouver" },
//     { value: "YUL", label: "Montréal-Pierre Elliott Trudeau International Airport, Montreal" },
//     { value: "YYC", label: "Calgary International Airport, Calgary" },
//     { value: "YEG", label: "Edmonton International Airport, Edmonton" },
//     { value: "YOW", label: "Ottawa Macdonald-Cartier International Airport, Ottawa" },
//     { value: "YHZ", label: "Halifax Stanfield International Airport, Halifax" },
//     { value: "YWG", label: "Winnipeg James Armstrong Richardson International Airport, Winnipeg" },
//     { value: "YQB", label: "Québec City Jean Lesage International Airport, Quebec City" },
//     { value: "YXE", label: "Saskatoon John G. Diefenbaker International Airport, Saskatoon" },
//     { value: "YQR", label: "Regina International Airport, Regina" },
//     { value: "YTZ", label: "Billy Bishop Toronto City Airport, Toronto" },
//     { value: "YYJ", label: "Victoria International Airport, Victoria" },
// ];

// const SearchForm = () => {
//     const [departureAirport, setDepartureAirport] = useState(null);
//     const [arrivalAirport, setArrivalAirport] = useState(null);
//     const [departureDate, setDepartureDate] = useState(new Date());
//     const [returnDate, setReturnDate] = useState(null);
//     const [passengers, setPassengers] = useState(1);

//     const dispatch = useDispatch();

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         dispatch(searchFlights({
//             departureAirport: departureAirport?.value,
//             arrivalAirport: arrivalAirport?.value,
//             departureDate,
//             returnDate,
//             passengers,
//         }));
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-smoke-950">
//                     Departure Airport:
//                 </label>
//                 <Select
//                     options={airportOptions}
//                     value={departureAirport}
//                     onChange={setDepartureAirport}
//                     placeholder="Select departure airport"
//                     className="mt-1"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-smoke-950">
//                     Arrival Airport:
//                 </label>
//                 <Select
//                     options={airportOptions}
//                     value={arrivalAirport}
//                     onChange={setArrivalAirport}
//                     placeholder="Select arrival airport"
//                     className="mt-1"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-smoke-950">
//                     Departure Date:
//                 </label>
//                 <DatePicker
//                     selected={departureDate}
//                     onChange={setDepartureDate}
//                     dateFormat="yyyy/MM/dd"
//                     className="mt-1 block w-full px-3 py-2 border border-smoke-400 rounded-md shadow-sm focus:outline-none focus:ring-smoke-500 focus:border-smoke-500"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-smoke-950">
//                     Return Date:
//                 </label>
//                 <DatePicker
//                     selected={returnDate}
//                     onChange={setReturnDate}
//                     dateFormat="yyyy/MM/dd"
//                     className="mt-1 block w-full px-3 py-2 border border-smoke-400 rounded-md shadow-sm focus:outline-none focus:ring-smoke-500 focus:border-smoke-500"
//                     placeholderText="Select a return date"
//                     isClearable
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-smoke-950">
//                     Passengers:
//                 </label>
//                 <input
//                     type="number"
//                     value={passengers}
//                     onChange={(e) => setPassengers(parseInt(e.target.value, 10))}
//                     min="1"
//                     max="10"
//                     className="mt-1 block w-full px-3 py-2 border border-smoke-400 rounded-md shadow-sm focus:outline-none focus:ring-smoke-500 focus:border-smoke-500"
//                 />
//             </div>
//             <button
//                 type="submit"
//                 className="w-full px-3 py-2 bg-sunrise-500 text-salmon-100 font-medium rounded-md shadow-sm hover:bg-smoke-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smoke-500"
//             >
//                 Search
//             </button>
//         </form>
//     );
// };

// export default SearchForm;