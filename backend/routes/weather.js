const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/:city', async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.WEATHERBIT_API_KEY;

    try {
        const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        res.json(data.data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
