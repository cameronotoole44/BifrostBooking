const { generateSeats } = require('../utils/seatGenerator');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log('Seeding seats...');
      await generateSeats();
    } catch (error) {
      console.error('Error seeding seats:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Seats', null, {});
  }
};

