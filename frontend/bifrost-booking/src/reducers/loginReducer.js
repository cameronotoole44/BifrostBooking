const initialState = {
    loading: false,
    userInfo: null,
    error: null,
};

const userLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return { ...state, loading: true };
        case 'USER_LOGIN_SUCCESS':
            return { loading: false, userInfo: action.payload };
        case 'USER_LOGIN_FAIL':
            return { loading: false, error: action.payload };
        case 'USER_LOGOUT':
            return initialState;
        default:
            return state;
    }
};

export default userLoginReducer;