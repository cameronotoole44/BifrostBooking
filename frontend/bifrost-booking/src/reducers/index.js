import { combineReducers } from 'redux';
import bookingReducer from './bookingReducer';
import flightReducer from './flightReducer';
import userReducer from './userReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
    bookings: bookingReducer,
    flights: flightReducer,
    user: userReducer,
    admin: adminReducer,
});

export default rootReducer;