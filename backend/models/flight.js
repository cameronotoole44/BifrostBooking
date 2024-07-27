const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Flight extends Model {
    static associate(models) {
      Flight.hasMany(models.Booking, { foreignKey: 'flightId', as: 'bookings' });
    }
  }

  Flight.init({
    departure: { type: DataTypes.STRING, allowNull: false },
    destination: { type: DataTypes.STRING, allowNull: false },
    departureDate: { type: DataTypes.DATE, allowNull: false },
    arrivalDate: { type: DataTypes.DATE, allowNull: true }
  }, {
    sequelize,
    modelName: 'Flight'
  });

  return Flight;
};