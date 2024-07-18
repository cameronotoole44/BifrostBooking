const express = require('express');
const router = express.Router();
const { SavedFlight } = require('../models');

// GET SAVED FLIGHTS //
router.get('/', async (req, res) => {
    try {
        const savedFlights = await SavedFlight.findAll({ where: { userId: req.user.id } });
        res.status(200).json(savedFlights);
    } catch (error) {
        console.error('Error fetching saved flights:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// SAVE NEW FLIGHT //
router.post('/', async (req, res) => {
    const { flightId } = req.body;
    try {
        const newSavedFlight = await SavedFlight.create({ userId: req.user.id, flightId });
        res.status(201).json(newSavedFlight);
    } catch (error) {
        console.error('Error saving flight:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE FLIGHT //
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { flightId } = req.body;
    try {
        const updatedSavedFlight = await SavedFlight.update({ flightId }, { where: { id, userId: req.user.id } });
        res.status(200).json(updatedSavedFlight);
    } catch (error) {
        console.error('Error updating saved flight:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE SAVED FLIGHT //
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await SavedFlight.destroy({ where: { id, userId: req.user.id } });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting saved flight:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;