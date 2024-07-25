import { combineReducers } from 'redux';
import bookingReducer from './bookingReducer';
import flightReducer from './flightReducer';
import userReducer from './userReducer';
import userLoginReducer from './loginReducer';
import adminReducer from './adminReducer';


const rootReducer = combineReducers({
    bookings: bookingReducer,
    flights: flightReducer,
    user: userReducer,
    userLogin: userLoginReducer,
    admin: adminReducer,
});

export default rootReducer;