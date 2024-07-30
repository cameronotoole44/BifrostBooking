import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../actions/actionTypes';

export const loginUser = (userData) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
        } else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: data.message || 'Login failed'
            });
        }
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message || 'Login failed'
        });
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
};