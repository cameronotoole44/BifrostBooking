const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
});

const models = {
    User: require('../models/user'),
    Booking: require('../models/booking'),
    Flight: require('../models/flight')
};

Object.values(models).forEach(model => {
    model.associate && model.associate(models);
});

module.exports = { sequelize, models };