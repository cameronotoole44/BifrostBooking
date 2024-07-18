const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Booking extends Model { }

Booking.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    flightId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    passengers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Booking',
    tableName: 'Bookings',
});

module.exports = Booking;
