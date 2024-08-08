const express = require('express');
const router = express.Router();
const { Seat } = require('../models');

// GET SEATS FOR A FLIGHT
router.get('/', async (req, res) => {
    const flightId = req.query.flightId;

    if (!flightId) {
        return res.status(400).json({ error: 'Flight ID is required' });
    }

    try {
        const seats = await Seat.findAll({ where: { flightId } });
        res.status(200).json(seats);
    } catch (error) {
        console.error('Error fetching seats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE SEAT STATUS
router.put('/:id', async (req, res) => {
    try {
        const seat = await Seat.findByPk(req.params.id);
        if (seat) {
            await seat.update(req.body);
            res.status(200).json(seat);
        } else {
            res.status(404).json({ error: 'Seat not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
