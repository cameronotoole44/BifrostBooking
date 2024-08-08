module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update the column type for 'seatNumber' in the 'Seats' table
    await queryInterface.changeColumn('Seats', 'seatNumber', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });

    // Update the column type for 'seatNumber' in the 'Bookings' table
    await queryInterface.changeColumn('Bookings', 'seatNumber', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the column type for 'seatNumber' in the 'Seats' table
    await queryInterface.changeColumn('Seats', 'seatNumber', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    // Revert the column type for 'seatNumber' in the 'Bookings' table
    await queryInterface.changeColumn('Bookings', 'seatNumber', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};


