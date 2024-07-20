'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        userId: 1, // matches an existing user ID //
        flightId: 1, // matches an existing flight ID //
        bookingDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        flightId: 2,
        bookingDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookings', null, {});
  }
};