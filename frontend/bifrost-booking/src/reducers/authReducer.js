import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from '../actions/types';

const initialState = {
    user: null,
    isAuthenticated: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};