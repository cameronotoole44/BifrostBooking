const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Seat extends Model {
        static associate(models) {
            Seat.belongsTo(models.Flight, { foreignKey: 'flightId', as: 'flight' });
        }
    }

    Seat.init({
        flightId: { type: DataTypes.INTEGER, allowNull: false },
        seatNumber: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.ENUM('available', 'booked', 'reserved'), allowNull: false, defaultValue: 'available' },
    }, {
        sequelize,
        modelName: 'Seat',
    });

    return Seat;
};
