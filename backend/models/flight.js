const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Flight extends Model {
    static associate(models) {
      Flight.hasMany(models.Booking, { foreignKey: 'flightId', as: 'bookings' });
      Flight.hasMany(models.Seat, { foreignKey: 'flightId', as: 'seats' });
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
    arrivalCity: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: 'Flight',
  });

  return Flight;
};