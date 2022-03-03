import AxiosClient from "adapters/ApiClient";
import { GetMechanicFailedFunction, GetMechanicSuccessFunction, RejectRequestFailedFunction, RejectRequestSuccessFunction, SendRequestFailedFunction, SendRequestSuccessFunction } from "types/mechanic";
import { acceptrequest, getmechanics, rejectrequest, sendrequest } from "urls";

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

export const sendRequest = (mechanicId: string, onSuccess: SendRequestSuccessFunction, onFailed: SendRequestFailedFunction) => {
    const onSuccessful = (response: any) => {
        onSuccess()
    } 

    const onError = (error:any) => {
        console.log(error)
    }
    const onTimeout = () => {

    }

    new AxiosClient(sendrequest, onSuccessful, onError, onTimeout, true).postWithoutConversion({
        mechanicId, 
        //@ts-ignore
        jobId: window.jobId
    })
}

export const rejectRequest = (jobId: string, onSuccess: RejectRequestSuccessFunction, onFailed: RejectRequestFailedFunction) => {
    const onSuccessful = (response: any) => {
        onSuccess()
    } 

    const onError = (error:any) => {
        console.log(error)
    }
    const onTimeout = () => {

    }

    new AxiosClient(rejectrequest, onSuccessful, onError, onTimeout, true).postWithoutConversion({
        jobId, 
        
    })
}
export const acceptRequest = (jobId: string, onSuccess: RejectRequestSuccessFunction, onFailed: RejectRequestFailedFunction) => {
    const onSuccessful = (response: any) => {
        onSuccess()
    } 

    const onError = (error:any) => {
        console.log(error)
    }
    const onTimeout = () => {

    }

    new AxiosClient(acceptrequest, onSuccessful, onError, onTimeout, true).postWithoutConversion({
        jobId, 
        
    })
}