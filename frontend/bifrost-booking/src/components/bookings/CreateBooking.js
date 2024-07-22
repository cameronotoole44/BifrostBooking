import React, { useState } from 'react';

const CreateBooking = ({ flightId }) => {
    const [passengerName, setPassengerName] = useState('');

    const handleCreateBooking = async (e) => {
        e.preventDefault();
        const response = await fetch('/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ flightId, passengerName })
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <form onSubmit={handleCreateBooking}>
            <input type="text" value={passengerName} onChange={(e) => setPassengerName(e.target.value)} placeholder="Passenger Name" required />
            <button type="submit">Book Flight</button>
        </form>
    )
};

export default CreateBooking;