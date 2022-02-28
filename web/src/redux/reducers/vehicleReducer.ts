import { ADD_VEHICLE, ADD_VEHICLES } from 'redux/types/vehicle';
import { VehicleDetails } from './../../interfaces/vehicle';
//@ts-ignore
import {cloneDeep} from 'lodash';

const initialState: VehicleDetails[] = [];

export const vehicleReducer = (state=initialState, action:any) => {
    switch(action.type){

        case ADD_VEHICLE:
            return cloneDeep([...state, action.payload.details])
        case ADD_VEHICLES:
            return cloneDeep([...action.payload.vehicles])
        default: 
            return state;
    }
}

