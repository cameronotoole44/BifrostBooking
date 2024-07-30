import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../actions/actionTypes';

export const loginUser = (credentials) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();
        console.log('Login response data:', data); //

        if (response.ok) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data.user
            });
            console.log('Dispatched USER_LOGIN_SUCCESS with:', data.user);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
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
    localStorage.removeItem('currentUser');
    dispatch({ type: USER_LOGOUT });
};