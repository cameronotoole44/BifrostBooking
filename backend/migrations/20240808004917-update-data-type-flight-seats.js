module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Flights', 'seats', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Flights', 'seats', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};