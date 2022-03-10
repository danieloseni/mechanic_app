import { updateMechanicLocation } from "adapters/firebase/firestore"
import {store} from 'redux/store'
export default class LiveLocation{

    static liveLocationStreamId:number

    static startLocationBroadcast = () => {
        const {user: {role}} = store.getState();
       
        if(role !== "mechanic") return
        
        this.liveLocationStreamId = navigator.geolocation.watchPosition((data) => {
            console.log("location updated")
            this.updateLocation({latitude: data.coords.latitude, longitude: data.coords.longitude})
        })
    }

    static updateLocation = (location: {latitude: number, longitude: number}) => {
        updateMechanicLocation(location);
    }

    static endLiveLocationBroadcast = () => {
        navigator.geolocation.clearWatch(this.liveLocationStreamId)
    }

}