// userActions.js
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
} from './actionTypes';

export const login = (credentials) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message,
        });
    }
};

export const userLogout = () => ({
    type: USER_LOGOUT,
});