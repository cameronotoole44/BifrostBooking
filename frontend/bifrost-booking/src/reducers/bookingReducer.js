import {
    FETCH_BOOKINGS_REQUEST,
    FETCH_BOOKINGS_SUCCESS,
    FETCH_BOOKINGS_FAILURE,
    FETCH_UPCOMING_BOOKINGS_REQUEST,
    FETCH_UPCOMING_BOOKINGS_SUCCESS,
    FETCH_UPCOMING_BOOKINGS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    bookings: [],
    upcomingBookings: [],
    loading: false,
    error: null,
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKINGS_REQUEST:
        case FETCH_UPCOMING_BOOKINGS_REQUEST:
            return { ...state, loading: true };
        case FETCH_BOOKINGS_SUCCESS:
            return { ...state, loading: false, bookings: action.payload };
        case FETCH_UPCOMING_BOOKINGS_SUCCESS:
            return { ...state, loading: false, upcomingBookings: action.payload };
        case FETCH_BOOKINGS_FAILURE:
        case FETCH_UPCOMING_BOOKINGS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default bookingReducer;