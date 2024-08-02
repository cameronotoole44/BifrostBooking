const { generateRandomFlights } = require('../utils/flightGenerator');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const flights = generateRandomFlights(50).map(flight => ({
      ...flight,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Flights', flights, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Flights', null, {});
  }
};

