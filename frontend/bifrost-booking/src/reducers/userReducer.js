const initialState = {
    users: [],
    loading: false,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload,
            };
        case 'CREATE_USER':
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case 'DELETE_USER':
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
            };
        default:
            return state;
    }
};

export default userReducer;