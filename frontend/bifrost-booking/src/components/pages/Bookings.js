import React from 'react';
import UserBookings from '../bookings/UserBookings';
import CreateBooking from '../bookings/CreateBooking';

const BookingsPage = () => {
    return (
        <div>
            <h1>Your Bookings</h1>
            <UserBookings />
            {/* Example flightId passed to CreateBooking */}
            <CreateBooking flightId={1} />
        </div>
    );
};

export default BookingsPage;
