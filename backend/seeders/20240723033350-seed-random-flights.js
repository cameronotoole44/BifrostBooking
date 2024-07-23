'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const flights = [];
    const numberOfFlights = 50; // NUMBER OF FLIGHTS TO GENERATE //

    const destinations = ['New York', 'London', 'Paris', 'Tokyo', 'Sydney'];
    const airlines = ['Delta', 'United', 'British Airways', 'Air France', 'Qantas'];

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < numberOfFlights; i++) {
      flights.push({
        departureCity: destinations[getRandomInt(0, destinations.length - 1)],
        arrivalCity: destinations[getRandomInt(0, destinations.length - 1)],
        departureDate: new Date(Date.now() + getRandomInt(1, 30) * 24 * 60 * 60 * 1000), //RANDOM DATE WITHIN THE NEXT 30 DAYS //
        arrivalDate: new Date(Date.now() + getRandomInt(31, 60) * 24 * 60 * 60 * 1000), // RANDOM DATE WITHIN THE NEXT 60 DAYS //
        airline: airlines[getRandomInt(0, airlines.length - 1)],
        price: (Math.random() * 500 + 100).toFixed(2), // RANDOM PRICE BETWEEN 100 AND 600 //
        nonStop: Math.random() > 0.5, // RANDOM TRUE/FALSE //
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Flights', flights, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Flights', null, {});
  }
};
