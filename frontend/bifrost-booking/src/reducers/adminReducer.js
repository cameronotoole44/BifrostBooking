import {
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
} from './adminActions';

const initialState = {
    users: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            return { ...state, users: [...state.users, action.payload] };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
            };
        default:
            return state;
    }
};

export default adminReducer;