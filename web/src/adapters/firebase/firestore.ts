import app from './app';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { store } from 'redux/store';

export const ap = app;
const database = getDatabase();


export const updateMechanicLocation = (data: { latitude: number, longitude: number }) => {
    const { latitude, longitude } = data
    const { user: { userId: id, firstname, lastname, email, phone } } = store.getState();

    set(ref(database, 'mechanics/' + store.getState().user.userId), {
        firstname,
        lastname,
        email,
        phone,
        id,
        latitude,
        longitude,
        date: new Date().toUTCString()

    });
}

export const getRequests = (onUpdate: (data:any) => void) => {
   
    const requestsRef = ref(database, 'requests');
    onValue(requestsRef, (snapshot) => {
        const data = snapshot.val();
        onUpdate(data);
        
    });
}
export const getMechnicLocations = (onUpdate: (data:any) => void) => {
    const mechanicsRef = ref(database, 'mechanics/');
    onValue(mechanicsRef, (snapshot) => {
        const data = snapshot.val();
        onUpdate(data);
        //updateStarCount(postElement, data);
    });
}





export default database;