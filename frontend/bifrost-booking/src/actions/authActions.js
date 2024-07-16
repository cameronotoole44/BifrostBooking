import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './types';

// LOGIN //
export const loginUser = (userData) => async (dispatch) => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            dispatch({
                type: LOGIN_USER,
                payload: data,
            });
        } else {
            console.error('Login failed:', data);
        }
    } catch (error) {
        console.error('Login error:', error);
    }
};

// LOGOUT //
export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
    };
};

// REGISTER //
export const registerUser = (userData) => async (dispatch) => {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            dispatch({
                type: REGISTER_USER,
                payload: data,
            });
        } else {
            console.error('Registration failed:', data);
        }
    } catch (error) {
        console.error('Registration error:', error);
    }
};