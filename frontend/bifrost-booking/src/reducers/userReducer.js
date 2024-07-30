import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../actions/actionTypes';

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
};

try {
    const userInfo = localStorage.getItem('currentUser');
    if (userInfo) {
        initialState.currentUser = JSON.parse(userInfo);
    }
} catch (e) {
    console.error('Failed to parse userInfo from localStorage:', e);
    localStorage.removeItem('currentUser');
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_LOGIN_SUCCESS:
            console.log('USER_LOGIN_SUCCESS:', action.payload);
            return {
                ...state,
                currentUser: action.payload,
                loading: false,
                error: null,
            };
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case USER_LOGOUT:
            return {
                ...state,
                currentUser: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default userReducer;
