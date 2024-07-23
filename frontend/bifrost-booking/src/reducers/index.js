import { combineReducers } from 'redux';
import bookingReducer from './bookingReducer';
import flightReducer from './flightReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    bookings: bookingReducer,
    flights: flightReducer,
    user: userReducer
});

export default rootReducer;