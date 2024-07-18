const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Flight extends Model { }

Flight.init({
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Flight',
  tableName: 'Flights',
});

module.exports = Flight;
