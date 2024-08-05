import {
    SEARCH_FLIGHTS_REQUEST,
    SEARCH_FLIGHTS_SUCCESS,
    SEARCH_FLIGHTS_FAILURE,
    CREATE_FLIGHT,
    UPDATE_FLIGHT,
    DELETE_FLIGHT,
    FETCH_FLIGHT_BY_ID_REQUEST,
    FETCH_FLIGHT_BY_ID_SUCCESS,
    FETCH_FLIGHT_BY_ID_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    flights: [],
    loading: false,
    error: null,
};

const flightReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_FLIGHTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SEARCH_FLIGHTS_SUCCESS:
            return {
                ...state,
                loading: false,
                flights: action.payload,
            };
        case SEARCH_FLIGHTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case CREATE_FLIGHT:
            return {
                ...state,
                flights: [...state.flights, action.payload],
            };
        case UPDATE_FLIGHT:
            return {
                ...state,
                flights: state.flights.map((flight) =>
                    flight.id === action.payload.id ? action.payload : flight
                ),
            };
        case DELETE_FLIGHT:
            return {
                ...state,
                flights: state.flights.filter((flight) => flight.id !== action.payload),
            };
        case FETCH_FLIGHT_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_FLIGHT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                flights: [...state.flights, action.payload],
            };
        case FETCH_FLIGHT_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default flightReducer;
