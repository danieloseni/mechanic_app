import AxiosClient from "adapters/ApiClient";
import { GetMechanicFailedFunction, GetMechanicSuccessFunction } from "types/mechanic";
import { getmechanics } from "urls";

export const getMechanics = (onSuccess: GetMechanicSuccessFunction, onFailed: GetMechanicFailedFunction) => {
    const onSuccessful = (response: any) => {
        onSuccess(response.data?.map?.((mechanic:any) => {
            const {firstname, lastname, email, phone, _id:id} = mechanic;
            return {firstname, lastname, email, phone, id}
        }))
    } 

    const onError = () => {
        
    }
    const onTimeout = () => {

    }

    new AxiosClient(getmechanics, onSuccessful, onError, onTimeout, true).get()
}