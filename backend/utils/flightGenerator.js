const { format, addDays, setHours, setMinutes } = require('date-fns');
const { faker } = require('@faker-js/faker');

const airlines = [
    'American Airlines',
    'Delta',
    'United',
    'Southwest',
    'Air Canada',
    'WestJet',
    'Porter Airlines',
    'Air Transat',
    'Swoop',
    'Flair Airlines'
];

const airports = [
    'JFK', 'LAX', 'ORD', 'ATL', 'DFW', 'DEN', 'SFO', 'MIA', 'SEA', 'LAS',
    'MCO', 'CLT', 'PHX', 'IAH', 'BOS', 'MSP', 'DTW', 'PHL', 'YYZ', 'YVR',
    'YUL', 'YYC', 'YEG', 'YOW', 'YHZ', 'YWG', 'YQB', 'YXE', 'YQR', 'YTZ', 'YYJ'
];

const airportToCity = {
    'JFK': 'New York', 'LAX': 'Los Angeles', 'ORD': 'Chicago', 'ATL': 'Atlanta',
    'DFW': 'Dallas/Fort Worth', 'DEN': 'Denver', 'SFO': 'San Francisco',
    'MIA': 'Miami', 'SEA': 'Seattle', 'LAS': 'Las Vegas', 'MCO': 'Orlando',
    'CLT': 'Charlotte', 'PHX': 'Phoenix', 'IAH': 'Houston', 'BOS': 'Boston',
    'MSP': 'Minneapolis', 'DTW': 'Detroit', 'PHL': 'Philadelphia', 'YYZ': 'Toronto',
    'YVR': 'Vancouver', 'YUL': 'Montreal', 'YYC': 'Calgary', 'YEG': 'Edmonton',
    'YOW': 'Ottawa', 'YHZ': 'Halifax', 'YWG': 'Winnipeg', 'YQB': 'Quebec',
    'YXE': 'Saskatoon', 'YQR': 'Regina', 'YTZ': 'Toronto', 'YYJ': 'Victoria'
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateRandomFlights = (numberOfFlights) => {
    const flights = [];

    for (let i = 0; i < numberOfFlights; i++) {
        const flightNumber = faker.helpers.replaceSymbols('FL####');
        const airline = getRandomElement(airlines);
        const departureAirport = getRandomElement(airports);
        let arrivalAirport;
        do {
            arrivalAirport = getRandomElement(airports);
        } while (arrivalAirport === departureAirport);

        const departureDate = addDays(new Date(), Math.floor(Math.random() * 30));
        const departureTime = setHours(setMinutes(departureDate, Math.floor(Math.random() * 60)), Math.floor(Math.random() * 24));
        const duration = Math.floor(Math.random() * 10) + 1; // 1 to 10 HOURS //
        const arrivalTime = addDays(departureTime, Math.floor(duration / 24));
        const arrivalMinutes = (departureTime.getMinutes() + duration * 60) % 60;
        const arrivalHours = (departureTime.getHours() + Math.floor((departureTime.getMinutes() + duration * 60) / 60)) % 24;
        const finalArrivalTime = setHours(setMinutes(arrivalTime, arrivalMinutes), arrivalHours);
        const price = faker.finance.amount({ min: 100, max: 500, dec: 2 }); // $100 to $500 USD //
        const seats = Math.floor(Math.random() * 200) + 50; // RANDOM SEATS BETWEEN 50 and 250 //

        flights.push({
            flightNumber,
            airline,
            departureAirport,
            arrivalAirport,
            departureTime: format(departureTime, 'yyyy-MM-dd HH:mm:ss'),
            arrivalTime: format(finalArrivalTime, 'yyyy-MM-dd HH:mm:ss'),
            duration: `${duration}h`,
            price: parseFloat(price),
            seats,
            arrivalCity: airportToCity[arrivalAirport] || 'Unknown City',
        });
    }

    return flights;
};


module.exports = { generateRandomFlights };


// const { format, addDays, setHours, setMinutes } = require('date-fns');
// const { faker } = require('@faker-js/faker');

// const airlines = [
//     'American Airlines',
//     'Delta',
//     'United',
//     'Southwest',
//     'Air Canada',
//     'WestJet',
//     'Porter Airlines',
//     'Air Transat',
//     'Swoop',
//     'Flair Airlines'
// ];

// const airports = [
//     // US AIRPORTS //
//     'JFK',  // John F. Kennedy International Airport, New York
//     'LAX',  // Los Angeles International Airport, Los Angeles
//     'ORD',  // O'Hare International Airport, Chicago
//     'ATL',  // Hartsfield-Jackson Atlanta International Airport, Atlanta
//     'DFW',  // Dallas/Fort Worth International Airport, Dallas/Fort Worth
//     'DEN',  // Denver International Airport, Denver
//     'SFO',  // San Francisco International Airport, San Francisco
//     'MIA',  // Miami International Airport, Miami
//     'SEA',  // Seattle-Tacoma International Airport, Seattle
//     'LAS',  // McCarran International Airport, Las Vegas
//     'MCO',  // Orlando International Airport, Orlando
//     'CLT',  // Charlotte Douglas International Airport, Charlotte
//     'PHX',  // Phoenix Sky Harbor International Airport, Phoenix
//     'IAH',  // George Bush Intercontinental Airport, Houston
//     'BOS',  // Boston Logan International Airport, Boston
//     'MSP',  // Minneapolis-Saint Paul International Airport, Minneapolis-Saint Paul
//     'DTW',  // Detroit Metropolitan Wayne County Airport, Detroit
//     'PHL',  // Philadelphia International Airport, Philadelphia

//     // CANADIAN AIRPORTS //
//     'YYZ',  // Toronto Pearson International Airport, Toronto
//     'YVR',  // Vancouver International Airport, Vancouver
//     'YUL',  // Montréal-Pierre Elliott Trudeau International Airport, Montreal
//     'YYC',  // Calgary International Airport, Calgary
//     'YEG',  // Edmonton International Airport, Edmonton
//     'YOW',  // Ottawa Macdonald-Cartier International Airport, Ottawa
//     'YHZ',  // Halifax Stanfield International Airport, Halifax
//     'YWG',  // Winnipeg James Armstrong Richardson International Airport, Winnipeg
//     'YQB',  // Québec City Jean Lesage International Airport, Quebec City
//     'YXE',  // Saskatoon John G. Diefenbaker International Airport, Saskatoon
//     'YQR',  // Regina International Airport, Regina
//     'YTZ',  // Billy Bishop Toronto City Airport, Toronto
//     'YVR',  // Victoria International Airport, Victoria
// ];

// const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// const generateRandomFlights = (numberOfFlights) => {
//     const flights = [];

//     for (let i = 0; i < numberOfFlights; i++) {
//         const flightNumber = faker.helpers.replaceSymbols('FL####');
//         const airline = getRandomElement(airlines);
//         const departureAirport = getRandomElement(airports);
//         let arrivalAirport;
//         do {
//             arrivalAirport = getRandomElement(airports);
//         } while (arrivalAirport === departureAirport);

//         const departureDate = addDays(new Date(), Math.floor(Math.random() * 30));
//         const departureTime = setHours(setMinutes(departureDate, Math.floor(Math.random() * 60)), Math.floor(Math.random() * 24));
//         const duration = Math.floor(Math.random() * 10) + 1; // 1 to 10 HOURS //
//         const arrivalTime = addDays(departureTime, Math.floor(duration / 24));
//         const arrivalMinutes = (departureTime.getMinutes() + duration * 60) % 60;
//         const arrivalHours = (departureTime.getHours() + Math.floor((departureTime.getMinutes() + duration * 60) / 60)) % 24;
//         const finalArrivalTime = setHours(setMinutes(arrivalTime, arrivalMinutes), arrivalHours);
//         const price = faker.finance.amount({ min: 100, max: 500, dec: 2 }); // $100 to $500 USD //

//         flights.push({
//             flightNumber,
//             airline,
//             departureAirport,
//             arrivalAirport,
//             departureTime: format(departureTime, 'yyyy-MM-dd HH:mm:ss'),
//             arrivalTime: format(finalArrivalTime, 'yyyy-MM-dd HH:mm:ss'),
//             duration: `${duration}h`,
//             price: parseFloat(price), // Ensure price is a number
//         });
//     }

//     return flights;
// };

// module.exports = { generateRandomFlights };
