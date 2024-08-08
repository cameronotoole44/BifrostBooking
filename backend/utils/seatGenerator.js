const { Seat, Flight } = require('../models');

async function generateSeats() {
    try {
        const flights = await Flight.findAll();
        console.log(`Found ${flights.length} flights.`);

        for (const flight of flights) {
            const totalSeats = parseInt(flight.seats, 10);
            console.log(`Generating seats for flight ${flight.id} with ${totalSeats} total seats.`);
            const seats = [];

            for (let row = 1; row <= Math.ceil(totalSeats / 6); row++) {
                for (let col = 0; col < 6; col++) {
                    if (seats.length >= totalSeats) break;
                    const seatNumber = `${row}${String.fromCharCode(65 + col)}`;
                    seats.push({
                        flightId: flight.id,
                        seatNumber,
                        status: 'available',
                    });
                }
            }

            console.log(`Bulk creating ${seats.length} seats for flight ${flight.id}`);
            await Seat.bulkCreate(seats);
        }

        console.log('Seats generated successfully');
    } catch (error) {
        console.error('Error generating seats:', error);
    }
}

module.exports = { generateSeats };