'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adding a foreign key constraint from Bookings to Users
    await queryInterface.addConstraint('Bookings', {
      fields: ['userId'],  // Column in the Bookings table
      type: 'foreign key',
      name: 'Bookings_userId_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });

    // Add similar constraints for Flights if needed
    // await queryInterface.addConstraint('Flights', {
    //   fields: ['userId'], // Column in the Flights table if applicable
    //   type: 'foreign key',
    //   name: 'Flights_userId_fkey',
    //   references: {
    //     table: 'Users',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    // });
  },

  down: async (queryInterface, Sequelize) => {
    // Removing the foreign key constraint
    await queryInterface.removeConstraint('Bookings', 'Bookings_userId_fkey');

    // Remove similar constraints for Flights if needed
    // await queryInterface.removeConstraint('Flights', 'Flights_userId_fkey');
  },
};
