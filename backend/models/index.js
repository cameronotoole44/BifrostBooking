const sequelize = require('../config/database');
const Sequelize = require('sequelize');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODEL IMPORT //
db.Flight = require('./flight');
db.User = require('./user');
db.Booking = require('./booking');

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;