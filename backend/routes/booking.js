const express = require('express');
const router = express.Router();
const { Booking, Flight } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

// CREATE BOOKING //
router.post('/', async (req, res) => {
    console.log('Received request to create booking');
    console.log('Request body:', req.body);

    try {
        const { userId, flightId, bookingDate } = req.body;

        if (!userId || !flightId || !bookingDate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const flight = await Flight.findByPk(flightId);

        if (!flight) {
            return res.status(404).json({ error: 'Flight not found' });
        }

        const newBooking = await Booking.create({
            userId,
            flightId,
            bookingDate,
        });

        console.log('New booking created:', newBooking);

        res.status(201).json({
            ...newBooking.dataValues,
            flight,
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET ALL BOOKINGS //
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [{ model: Flight, as: 'flight' }],
        });
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPCOMING BOOKINGS //
router.get('/upcoming-bookings', async (req, res) => {
    try {
        const userId = parseInt(req.query.userId, 10); // Ensure userId is an integer
        console.log('Received userId:', userId); // Debugging log

        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Valid User ID is required' });
        }

        const currentDate = moment().toDate();

        const upcomingBookings = await Booking.findAll({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: Flight,
                    as: 'flight',
                    required: true,
                    where: {
                        departureTime: {
                            [Op.gt]: currentDate,
                        },
                    },
                },
            ],
            order: [[{ model: Flight, as: 'flight' }, 'departureTime', 'ASC']],
        });

        res.status(200).json(upcomingBookings);
    } catch (error) {
        console.error('Error fetching upcoming bookings:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET SINGLE BOOKING //
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (booking) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE BOOKING //
router.put('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (booking) {
            await booking.update(req.body);
            res.status(200).json(booking);
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE BOOKING //
router.delete('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (booking) {
            await booking.destroy();
            res.status(200).json({ message: 'Booking deleted' });
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;