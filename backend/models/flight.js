const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Flight extends Model {
    static associate(models) {
      Flight.hasMany(models.Booking, { foreignKey: 'flightId', as: 'bookings' });
    }
  }

  Flight.init({
    flightNumber: { type: DataTypes.STRING, allowNull: false },
    airline: { type: DataTypes.STRING, allowNull: false },
    departureAirport: { type: DataTypes.STRING, allowNull: false },
    arrivalAirport: { type: DataTypes.STRING, allowNull: false },
    departureTime: { type: DataTypes.DATE, allowNull: false },
    arrivalTime: { type: DataTypes.DATE, allowNull: true },
    duration: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    seats: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'Flight',
  });

  return Flight;
};



// const { Model, DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   class Flight extends Model {
//     static associate(models) {
//       Flight.hasMany(models.Booking, { foreignKey: 'flightId', as: 'bookings' });
//     }
//   }

//   Flight.init({
//     flightNumber: { type: DataTypes.STRING, allowNull: false },
//     airline: { type: DataTypes.STRING, allowNull: false },
//     departureAirport: { type: DataTypes.STRING, allowNull: false },
//     arrivalAirport: { type: DataTypes.STRING, allowNull: false },
//     departureTime: { type: DataTypes.DATE, allowNull: false },
//     arrivalTime: { type: DataTypes.DATE, allowNull: true },
//     duration: { type: DataTypes.STRING, allowNull: false },
//     price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
//   }, {
//     sequelize,
//     modelName: 'Flight',
//   });

//   return Flight;
// };