const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const flightRoutes = require('./routes/flight');
const savedFlightRoutes = require('./routes/savedFlights');

dotenv.config();

const app = express();

// SEQUELIZE //
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

// MIDDLEWARE //
app.use(cors());
app.use(express.json());

// ROUTES //
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/saved-flights', savedFlightRoutes);

// HOME/DEFAULT LANDING //
app.get('/', (req, res) => {
    res.send('Hello Team!');
});

// 404 FOR UNDEFINED ROUTES //
app.get('*', (req, res) => {
    res.status(404).send('<h1>404 Page Not Found</h1>');
});

// ERROR HANDLING MIDDLEWARE //
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke -_- !');
});

// SERVER START //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));