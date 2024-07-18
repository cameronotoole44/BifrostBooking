const sequelize = require('../config/database');
const Sequelize = require('sequelize');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models directly
db.Flight = require('./flight'); // No need to pass sequelize and DataTypes
db.User = require('./user');
db.Booking = require('./booking');

// Define associations if needed
// Example:
// db.Flight.belongsTo(db.User);
// db.User.hasMany(db.Flight);

module.exports = db;