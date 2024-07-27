const { User, Booking } = require('../models');
const bcrypt = require('bcrypt');


// GET USER PROFILE //
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


// UPDATE USER PROFILE //
exports.updateUserProfile = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.email = email || user.email;
        if (password) user.password = await bcrypt.hash(password, 10);
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET USERS BOOKINGS //
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({ where: { userId: req.user.id }, include: ['flight'] });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


// CREATE A BOOKING //
exports.createBooking = async (req, res) => {
    const { flightId } = req.body;
    try {
        const flight = await Flight.findByPk(flightId);
        if (!flight) return res.status(404).json({ error: 'Flight not found' });

        const booking = await Booking.create({ userId: req.user.id, flightId });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// UPDATE BOOKING //
exports.updateBooking = async (req, res) => {
    const { id } = req.params;
    const { flightId } = req.body;
    try {
        const booking = await Booking.findByPk(id);
        if (!booking || booking.userId !== req.user.id) return res.status(404).json({ error: 'Booking not found' });

        if (flightId) booking.flightId = flightId;
        await booking.save();
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


// DELETE BOOKING //
exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findByPk(id);
        if (!booking || booking.userId !== req.user.id) return res.status(404).json({ error: 'Booking not found' });

        await booking.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};