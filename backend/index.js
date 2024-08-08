const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, Booking } = require('./models');
const weatherRoutes = require('./routes/weather');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking');
const flightRoutes = require('./routes/flight');
const seatsRouter = require('./routes/seats');
// const adminRoutes = require('./routes/admin');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// MIDDLEWARE //
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

// ROUTES //
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/weather', weatherRoutes);
app.use('/bookings', bookingRoutes);
app.use('/flights', flightRoutes);
app.use('/seats', seatsRouter);
// app.use('/admin', adminRoutes);


// HOME/DEFAULT LANDING //
app.get('/', (req, res) => {
    res.send('Hello Team!');
});

// 404 FOR UNDEFINED ROUTES //
app.get('*', (req, res) => {
    res.status(404).send('<h1>404 Page Not Found</h1>');
});

// ERROR HANDLING MIDDLEWARE //
app.use(errorHandler);

// SERVER START //
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
