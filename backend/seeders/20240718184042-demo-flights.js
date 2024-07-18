'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Flights', [
      {
        origin: 'MAD',
        destination: 'JFK',
        departureDate: '2024-07-22',
        returnDate: '2024-07-29',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        origin: 'LAX',
        destination: 'ORD',
        departureDate: '2024-08-01',
        returnDate: '2024-08-10',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //  TODO: MORE FLIGHT DATA //
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Flights', null, {});
  }
};
