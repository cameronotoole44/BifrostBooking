import {
    FETCH_BOOKINGS_REQUEST,
    FETCH_BOOKINGS_SUCCESS,
    FETCH_BOOKINGS_FAILURE,
    DELETE_BOOKING_REQUEST,
    DELETE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAILURE
} from '../actions/actionTypes';

const initialState = {
    bookings: [],
    loading: false,
    error: null,
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKINGS_REQUEST:
            return { ...state, loading: true };
        case FETCH_BOOKINGS_SUCCESS:
            return { ...state, loading: false, bookings: Array.isArray(action.payload) ? action.payload : [] };
        case FETCH_BOOKINGS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case DELETE_BOOKING_REQUEST:
            return { ...state, loading: true };
        case DELETE_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                bookings: state.bookings.filter(booking => booking.id !== action.payload),
            };
        case DELETE_BOOKING_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default bookingReducer;