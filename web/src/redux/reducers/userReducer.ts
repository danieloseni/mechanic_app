import { UserState } from "redux/interfaces/user";
import { ADD_USER_INFO } from "redux/types/user";

const initialState:UserState = {
   
}
const userReducer = (state=initialState, action:any) => {
    switch(action.type){
        case ADD_USER_INFO:
            return {
                ...action.payload.details
            }
        default:
            return state;
    }
}

export default userReducer;