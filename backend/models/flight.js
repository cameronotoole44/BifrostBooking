const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Flight extends Model { }

Flight.init({
  departureCity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  arrivalCity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  arrivalDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  airline: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  nonStop: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Flight',
  tableName: 'Flights',
  timestamps: true,
});

module.exports = Flight;

