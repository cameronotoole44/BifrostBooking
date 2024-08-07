import {
    FETCH_BOOKINGS_REQUEST,
    FETCH_BOOKINGS_SUCCESS,
    FETCH_BOOKINGS_FAILURE
} from './actionTypes';

export const fetchBookings = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_BOOKINGS_REQUEST });

    try {
        const response = await fetch(`http://localhost:5000/bookings?userId=${userId}`);
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


