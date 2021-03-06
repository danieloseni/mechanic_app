import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
//@ts-ignore
import storage from 'redux-persist/lib/storage';
import { LiveLocationReducer } from './liveLocationReducer';
import liveMechanicsReducer from './liveMechanicsReducer';
import userReducer from './userReducer';
import { vehicleReducer } from './vehicleReducer';

const persistConfig = {
    storage,
    key: "root",
    whitelist: ['user', "vehicles"]
}

const rootReducer = combineReducers({
    user: userReducer,
    vehicles: vehicleReducer,
    mechanics: liveMechanicsReducer,
    liveLocation: LiveLocationReducer
});

export default persistReducer(persistConfig, rootReducer);