module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('Flights', 'seats', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 100
    });

    // THIS UPDATES EXISTING FLIGHTS //
    await queryInterface.sequelize.query(
      `UPDATE "Flights" SET "seats" = 100 WHERE "seats" IS NULL;`
    );
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('Flights', 'seats');
  }
};