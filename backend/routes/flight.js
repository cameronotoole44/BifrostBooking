const express = require('express');
const router = express.Router();
const { Flight } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');

// CREATE FLIGHT //
router.post('/', authMiddleware, async (req, res) => {
    try {
        const flight = await Flight.create(req.body);
        res.status(201).json(flight);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET ALL FLIGHTS //
router.get('/', async (req, res) => {
    try {
        const flights = await Flight.findAll();
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET SINGLE FLIGHT //
router.get('/:id', async (req, res) => {
    try {
        const flight = await Flight.findByPk(req.params.id);
        if (flight) {
            res.status(200).json(flight);
        } else {
            res.status(404).json({ error: 'Flight not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE FLIGHT //
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const flight = await Flight.findByPk(req.params.id);
        if (flight) {
            await flight.update(req.body);
            res.status(200).json(flight);
        } else {
            res.status(404).json({ error: 'Flight not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE FLIGHT //
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const flight = await Flight.findByPk(req.params.id);
        if (flight) {
            await flight.destroy();
            res.status(200).json({ message: 'Flight deleted' });
        } else {
            res.status(404).json({ error: 'Flight not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;