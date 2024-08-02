// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.removeConstraint('Bookings', 'Bookings_userId_fkey');
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.addConstraint('Bookings', {
//       fields: ['userId'],
//       type: 'foreign key',
//       name: 'Bookings_userId_fkey',
//       references: {
//         table: 'Users',
//         field: 'id',
//       },
//       onDelete: 'CASCADE',
//     });
//   },
// };
