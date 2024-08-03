const express = require('express');
const router = express.Router();
const { Flight } = require('../models');

// CREATE FLIGHT //
router.post('/', async (req, res) => {
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

// SEARCH FLIGHTS //
router.get('/search', async (req, res) => {
    try {
        const {
            departureAirport,
            arrivalAirport,
            departureTime,
            arrivalTime,
        } = req.query;

        const flights = await Flight.findAll({
            where: {
                ...(departureAirport && { departureAirport }),
                ...(arrivalAirport && { arrivalAirport }),
                ...(departureTime && { departureTime: new Date(departureTime) }),
                ...(arrivalTime && { arrivalTime: new Date(arrivalTime) }),
            },
        });

        res.json(flights);
    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

// ADMIN ACCESS TO ADD FLIGHTS ETC. //