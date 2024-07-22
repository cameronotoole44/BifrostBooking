import React, { useEffect, useState } from 'react';

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await fetch('/bookings/user');
            const data = await response.json();
            setBookings(data);
        };

        fetchBookings();
    }, []);

    return (
        <ul>
            {bookings.map(booking => (
                <li key={booking.id}>{booking.flightName}</li>
            ))}
        </ul>
    );
};

export default UserBookings;