const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Booking extends Model {
        static associate(models) {
            Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            Booking.belongsTo(models.Flight, { foreignKey: 'flightId', as: 'flight' });
        }
    }

    Booking.init({
        userId: { type: DataTypes.INTEGER, allowNull: false },
        flightId: { type: DataTypes.INTEGER, allowNull: false },
        bookingDate: { type: DataTypes.DATE, allowNull: false }
    }, {
        sequelize,
        modelName: 'Booking'
    });

    return Booking;
};