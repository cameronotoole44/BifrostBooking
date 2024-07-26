const { User, Booking } = require('../models');
const bcrypt = require('bcrypt');

// GETS USER PROFILE //
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

// GETS USER'S BOOKINGS //
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({ where: { userId: req.user.id } });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};