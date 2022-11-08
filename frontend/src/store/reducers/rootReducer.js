import { combineReducers } from 'redux';
import loadingReducer from './loading.reducer';
import notifyReducer from './notify.reducer';
import alertReducer from './alert.reducer';
import authReducer from './auth.reducer';
import vehicleReducer from './vehicles.reducer';
import registerReducer from './register.reducer';
import vehicleReducer_ from './vehicle_.reducer'

const rootReducer = combineReducers({
    loadingReducer,
    notifyReducer,
    alertReducer,
    authReducer,
    registerReducer,
    vehicleReducer,
    vehicleReducer_
});

export default rootReducer;