const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const GET_USERS = 'GET_USERS';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';


export const login = (credentials) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, error });
    }
};

export const getUsers = () => async (dispatch) => {
    try {
        const response = await fetch('/users');
        const data = await response.json();
        dispatch({ type: GET_USERS, payload: data });
    } catch (error) {
        console.error('Failed to fetch users', error);
    }
};

export const createUser = (userData) => async (dispatch) => {
    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        dispatch({ type: CREATE_USER, payload: data });
    } catch (error) {
        console.error('Failed to create user', error);
    }
};

export const updateUser = (userId, userData) => async (dispatch) => {
    try {
        const response = await fetch(`/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        dispatch({ type: UPDATE_USER, payload: data });
    } catch (error) {
        console.error('Failed to update user', error);
    }
};

export const deleteUser = (userId) => async (dispatch) => {
    try {
        await fetch(`/users/${userId}`, { method: 'DELETE' });
        dispatch({ type: DELETE_USER, payload: userId });
    } catch (error) {
        console.error('Failed to delete user', error);
    }
};