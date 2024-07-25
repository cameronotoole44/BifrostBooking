export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_LOGOUT = 'USER_LOGOUT';

export const userLoginRequest = () => ({
    type: USER_LOGIN_REQUEST,
});

export const userLoginSuccess = (userInfo) => ({
    type: USER_LOGIN_SUCCESS,
    payload: userInfo,
});

export const userLoginFail = (error) => ({
    type: USER_LOGIN_FAIL,
    payload: error,
});

export const userLogout = () => ({
    type: USER_LOGOUT,
});