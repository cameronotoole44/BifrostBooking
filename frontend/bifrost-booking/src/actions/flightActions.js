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

export const searchFlights = (searchParams) => async (dispatch) => {
    dispatch({ type: SEARCH_FLIGHTS_REQUEST });
    try {
        const response = await fetch(`http://localhost:5000/flights/search?${new URLSearchParams(searchParams)}`);
        const data = await response.json();
        dispatch({ type: SEARCH_FLIGHTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SEARCH_FLIGHTS_FAILURE, error });
    }
};

export const createFlight = (flightData) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:5000/flights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(flightData),
        });
        const data = await response.json();
        dispatch({ type: CREATE_FLIGHT, payload: data });
    } catch (error) {
        console.error('Failed to create flight', error);
    }
};

export const updateFlight = (flightId, flightData) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:5000/flights/${flightId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(flightData),
        });
        const data = await response.json();
        dispatch({ type: UPDATE_FLIGHT, payload: data });
    } catch (error) {
        console.error('Failed to update flight', error);
    }
};

export const deleteFlight = (flightId) => async (dispatch) => {
    try {
        await fetch(`http://localhost:5000/flights/${flightId}`, { method: 'DELETE' });
        dispatch({ type: DELETE_FLIGHT, payload: flightId });
    } catch (error) {
        console.error('Failed to delete flight', error);
    }
};

export const fetchFlightById = (flightId) => async (dispatch) => {
    dispatch({ type: FETCH_FLIGHT_BY_ID_REQUEST });
    try {
        const response = await fetch(`http://localhost:5000/flights/${flightId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch flight');
        }
        const data = await response.json();
        dispatch({ type: FETCH_FLIGHT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_FLIGHT_BY_ID_FAILURE, error: error.message });
    }
};