import {
    FETCH_BOOKINGS_REQUEST,
    FETCH_BOOKINGS_SUCCESS,
    FETCH_BOOKINGS_FAILURE,
    DELETE_BOOKING_REQUEST,
    DELETE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAILURE
} from './actionTypes';

// FETCH BOOKINGS //
export const fetchBookings = () => async (dispatch) => {
    dispatch({ type: FETCH_BOOKINGS_REQUEST });

    try {
        const response = await fetch('http://localhost:5000/bookings');
        const data = await response.json();

        dispatch({
            type: FETCH_BOOKINGS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_BOOKINGS_FAILURE,
            payload: error.message,
        });
    }
};

// DELETE //
export const deleteBooking = (bookingId) => async (dispatch) => {
    dispatch({ type: DELETE_BOOKING_REQUEST });

    try {
        const response = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            dispatch({
                type: DELETE_BOOKING_SUCCESS,
                payload: bookingId,
            });
        } else {
            throw new Error('Failed to delete booking');
        }
    } catch (error) {
        dispatch({
            type: DELETE_BOOKING_FAILURE,
            payload: error.message,
        });
    }
};