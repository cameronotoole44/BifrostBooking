const { Op } = require('sequelize');
const { Flight } = require('../models');

const getFlights = async (req, res) => {
    try {
        const { departureAirport, arrivalAirport, departureDate, returnDate, passengers } = req.query;


        const query = {
            where: {},
            order: []
        };

        if (departureAirport) {
            query.where.departureAirport = departureAirport;
        }
        if (arrivalAirport) {
            query.where.arrivalAirport = arrivalAirport;
        }
        if (departureDate) {
            query.where.departureTime = { [Op.gte]: new Date(departureDate) };  // OP GREATER THAN OR EQUAL TO //
        }
        if (returnDate) {
            query.where.arrivalTime = { [Op.lte]: new Date(returnDate) }; // OP LESS THAN OR EQUAL TO //
        }
        if (passengers) {
            // Example if you have a field for passenger capacity
            // query.where.passengerCapacity = { [Op.gte]: parseInt(passengers, 10) };
        }

        // SORTING CRITERIA //
        query.order.push(['departureTime', 'ASC']); // PRIMARY //
        query.order.push(['price', 'ASC']); // SECONDARY //


        const flights = await Flight.findAll(query);

        res.json(flights);
    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getFlights };