'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const columns = await queryInterface.describeTable('Flights');


    if (!columns.airline) {
      await queryInterface.addColumn('Flights', 'airline', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Unknown',
      });
    }


    if (!columns.price) {
      await queryInterface.addColumn('Flights', 'price', {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      });
    }


    if (!columns.nonStop) {
      await queryInterface.addColumn('Flights', 'nonStop', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('Flights', 'airline');
    await queryInterface.removeColumn('Flights', 'price');
    await queryInterface.removeColumn('Flights', 'nonStop');
  }
};

