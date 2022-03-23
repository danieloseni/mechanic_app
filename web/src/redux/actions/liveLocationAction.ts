import LiveLocation from "controllers/live-location-controller"
import { UPDATE_LIVE_LOCATION_STATE } from './../types/liveLocation';

export const turnOnOrOffLiveLocation = (newState:boolean) => {

    return (dispatch:any, getState:any) => {
        if(newState){
            LiveLocation.startLocationBroadcast()
            
        }else{
            LiveLocation.endLiveLocationBroadcast()
        }

        dispatch({
            type: UPDATE_LIVE_LOCATION_STATE,
            payload: {
                state: newState
            }
        })
    }
}