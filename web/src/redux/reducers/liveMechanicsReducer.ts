import { UPDATE_LIVE_MECHANICS_LIST } from "redux/types/mechanics";
//@ts-ignore
import {cloneDeep} from 'lodash';
const initialState:any[]=[]

const liveMechanicsReducer = (state=initialState, action:any) => {
    switch(action.type){
        case UPDATE_LIVE_MECHANICS_LIST:
            return cloneDeep(action.payload.mechanics)
        default:
            return state
    }
}

export default liveMechanicsReducer;