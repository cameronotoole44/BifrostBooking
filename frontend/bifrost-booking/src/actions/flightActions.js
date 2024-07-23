const SEARCH_FLIGHTS_REQUEST = 'SEARCH_FLIGHTS_REQUEST';
const SEARCH_FLIGHTS_SUCCESS = 'SEARCH_FLIGHTS_SUCCESS';
const SEARCH_FLIGHTS_FAILURE = 'SEARCH_FLIGHTS_FAILURE';
const GET_FLIGHTS = 'GET_FLIGHTS';
const CREATE_FLIGHT = 'CREATE_FLIGHT';
const UPDATE_FLIGHT = 'UPDATE_FLIGHT';
const DELETE_FLIGHT = 'DELETE_FLIGHT';


export const searchFlights = (searchParams) => async (dispatch) => {
    dispatch({ type: SEARCH_FLIGHTS_REQUEST });
    try {
        const response = await fetch(`/flights/search?${new URLSearchParams(searchParams)}`);
        const data = await response.json();
        dispatch({ type: SEARCH_FLIGHTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SEARCH_FLIGHTS_FAILURE, error });
    }
};

export const getFlights = () => async (dispatch) => {
    try {
        const response = await fetch('/flights');
        const data = await response.json();
        dispatch({ type: GET_FLIGHTS, payload: data });
    } catch (error) {
        console.error('Failed to fetch flights', error);
    }
};

export const createFlight = (flightData) => async (dispatch) => {
    try {
        const response = await fetch('/flights', {
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
        const response = await fetch(`/flights/${flightId}`, {
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
        await fetch(`/flights/${flightId}`, { method: 'DELETE' });
        dispatch({ type: DELETE_FLIGHT, payload: flightId });
    } catch (error) {
        console.error('Failed to delete flight', error);
    }
};