const initialState = {
    flights: [],
    loading: false,
    error: null,
};

const flightReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_FLIGHTS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'SEARCH_FLIGHTS_SUCCESS':
            return {
                ...state,
                loading: false,
                flights: action.payload
            };
        case 'SEARCH_FLIGHTS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case 'GET_FLIGHTS':
            return {
                ...state,
                flights: action.payload,
            };
        case 'CREATE_FLIGHT':
            return {
                ...state,
                flights: [...state.flights, action.payload],
            };
        case 'UPDATE_FLIGHT':
            return {
                ...state,
                flights: state.flights.map((flight) =>
                    flight.id === action.payload.id ? action.payload : flight
                ),
            };
        case 'DELETE_FLIGHT':
            return {
                ...state,
                flights: state.flights.filter((flight) => flight.id !== action.payload),
            };
        default:
            return state;
    }
};

export default flightReducer;

