const initialState = {
    bookings: [],
    loading: false,
    error: null
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_BOOKINGS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'FETCH_BOOKINGS_SUCCESS':
            return {
                ...state,
                loading: false,
                bookings: action.payload
            };
        case 'FETCH_BOOKINGS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;
    }
};

export default bookingReducer;