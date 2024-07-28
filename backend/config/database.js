const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
});

const User = require('../models/user');
const Booking = require('../models/booking');
const Flight = require('../models/flight');

const models = {
    User: User(sequelize, Sequelize.DataTypes),
    Booking: Booking(sequelize, Sequelize.DataTypes),
    Flight: Flight(sequelize, Sequelize.DataTypes),
};

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

module.exports = { sequelize, models };