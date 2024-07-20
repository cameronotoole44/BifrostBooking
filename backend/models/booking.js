const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Booking extends Model { }

Booking.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    flightId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Flights',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    bookingDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Booking',
    tableName: 'Bookings',
});

Booking.associate = function (models) {
    Booking.belongsTo(models.User, { foreignKey: 'userId' });
    Booking.belongsTo(models.Flight, { foreignKey: 'flightId' });
};

module.exports = Booking;