import AxiosClient from "adapters/ApiClient";
import { LoginCredentials, RegistrationCredentials } from "interfaces/authentication";
import { LoginFailedFunction, LoginSuccessFunction, RegisterFailedFunction, RegisterSuccessFunction } from "types/authentication";
import { loginuser, registerclient, registermechanic } from 'urls';

export const login = (credentials: LoginCredentials, onSuccess: LoginSuccessFunction, onFailed: LoginFailedFunction, onWrongLogins?: () => void) => {
  
    const onSuccessful = (response:any) => {
        const {firstname, lastname, email, jwt:token, id:userId, phone, role} = response.data;
        onSuccess({
            firstname, lastname, email, phone, token, userId, role
        })
    }

    const onError = (error:any) => {
        
        if(error?.response?.status === 401){
            onWrongLogins?.()
        }
    }

    const onTimeout = () => {

    }
    
    new AxiosClient(loginuser, onSuccessful, onError, onTimeout).postWithoutConversion(credentials);
}

export const register = (credentials: RegistrationCredentials,role: "mechanic" | "client", onSuccess: RegisterSuccessFunction, onFailed: RegisterFailedFunction, onValidationError: () => void) => {
   
    const onSuccessful = (response:any) => {
        const {firstname, lastname, email, jwt:token, id:userId, phone, role} = response.data;
        onSuccess({
            firstname, lastname, email, phone, token, userId, role
        })
    }

    const onError = (error:any) => {
        if(error?.response?.status === 400){
            onValidationError()
        }
    }

    const onTimeout = () => {

    }
    new AxiosClient(role === "mechanic" ? registermechanic : registerclient, onSuccessful, onError, onTimeout).postWithoutConversion(credentials);
}