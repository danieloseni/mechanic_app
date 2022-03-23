import { UPDATE_LIVE_LOCATION_STATE } from './../types/liveLocation';
const initialState = {
    liveLocationActive: true
}

export const LiveLocationReducer = (state=initialState, action:any) => {
    switch(action.type){
        case UPDATE_LIVE_LOCATION_STATE:
            return {
                ...state,
                liveLocationActive: action.payload.state
            }
        default:
            return state;

    }
}