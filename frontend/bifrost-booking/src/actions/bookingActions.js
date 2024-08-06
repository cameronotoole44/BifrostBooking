import {
    FETCH_BOOKINGS_REQUEST,
    FETCH_BOOKINGS_SUCCESS,
    FETCH_BOOKINGS_FAILURE,
    FETCH_UPCOMING_BOOKINGS_REQUEST,
    FETCH_UPCOMING_BOOKINGS_SUCCESS,
    FETCH_UPCOMING_BOOKINGS_FAILURE,
} from './actionTypes';

// Fetch all bookings
export const fetchBookings = () => async (dispatch) => {
    dispatch({ type: FETCH_BOOKINGS_REQUEST });

    try {
        const response = await fetch('http://localhost:5000/bookings');
        const data = await response.json();

        if (Array.isArray(data)) {
            dispatch({
                type: FETCH_BOOKINGS_SUCCESS,
                payload: data,
            });
        } else {
            dispatch({
                type: FETCH_BOOKINGS_FAILURE,
                payload: 'Unexpected data format',
            });
        }
    } catch (error) {
        dispatch({
            type: FETCH_BOOKINGS_FAILURE,
            payload: error.message,
        });
    }
};

// Fetch upcoming bookings for a specific user
export const fetchUpcomingBookings = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_UPCOMING_BOOKINGS_REQUEST });

    try {
        const url = `http://localhost:5000/bookings/upcoming-bookings?userId=${userId}`;
        console.log('Fetching URL:', url);

        const response = await fetch(url);
        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        dispatch({ type: FETCH_UPCOMING_BOOKINGS_SUCCESS, payload: data });
    } catch (error) {
        console.error('Fetch upcoming bookings error:', error);
        dispatch({ type: FETCH_UPCOMING_BOOKINGS_FAILURE, payload: error.message });
    }
};

