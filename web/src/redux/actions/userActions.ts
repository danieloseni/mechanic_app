import { LoginCredentials, RegistrationCredentials, UserInfo } from "interfaces/authentication";
import { login as LoginController, register as RegistrationController } from 'controllers/authentication';
import { ADD_USER_INFO } from "redux/types/user";

export const login = (credentials: LoginCredentials) => {

    return (dispatch:any, getState:any) => {
        const onSuccess = (details: UserInfo) => {
            dispatch({
                type: ADD_USER_INFO,
                payload: {
                    details
                }
            })
            localStorage.setItem("loggedin", "true")
            window.location.href="/"
        }
        const onFailed = () => {

        }

        LoginController(credentials, onSuccess, onFailed);
    }
    
}

export const register = (credentials: RegistrationCredentials, role: "mechanic" | "client") => {

    return (dispatch:any, getState:any) => {
        const onSuccess = (details: UserInfo) => {
            dispatch({
                type: ADD_USER_INFO,
                payload: {
                    details
                }
            })

            window.location.href="/"
        }
        const onFailed = () => {

        }

        RegistrationController(credentials, role, onSuccess, onFailed);
    }
    
}