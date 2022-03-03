import { getMechnicLocations } from "adapters/firebase/firestore"
import { Dispatch } from "redux";
import { UPDATE_LIVE_MECHANICS_LIST } from "redux/types/mechanics";

export const getLiveMechanics = () => {
    return (dispatch:Dispatch, getState:any) => {
        getMechnicLocations((data) => {
            const mechanics = Object.values(data);
            dispatch({
                type: UPDATE_LIVE_MECHANICS_LIST,
                payload: {
                    mechanics
                }
            })
        })
    }
}