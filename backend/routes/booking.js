const express = require('express');
const router = express.Router();
const { Booking } = require('../models');
const { Flight } = require('../models');

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
            bookingDate
        });

        console.log('New booking created:', newBooking);

        res.status(201).json({
            ...newBooking.dataValues,
            flight
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET ALL BOOKINGS //
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
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