import AxiosClient from "adapters/ApiClient";
import { CreateJobFailedFunction, CreateJobSuccessFunction, GetJobFailedFunction, GetJobSuccessFunction, MarkDoneFailedFunction, MarkDoneSuccessFunction, MarkMetFailedFunction, MarkMetSuccessFunction } from "types/job";
import { createjob, getjobs, markdone, markmet } from "urls";
//@ts-ignore
import {cloneDeep} from 'lodash'

export const createJob = (vehicleId: string, onSuccess: CreateJobSuccessFunction, onFailed: CreateJobFailedFunction) => {
    const onSuccessful = (response: any) => {
        onSuccess(response.data._id)
        //@ts-ignore
        window.vehicleId = vehicleId;
        //@ts-ignore
        window.jobId = response.data._id
    } 

    const onError = () => {
    }
    const onTimeout = () => {

    }
      
    new AxiosClient(createjob, onSuccessful, onError, onTimeout, true).postWithoutConversion({
        vehicleId, 
        
    })
}

export const getJobs = (onSuccess: GetJobSuccessFunction, onFailed: GetJobFailedFunction) => {
    const onSuccessful = (response: any) => {
       
        onSuccess(cloneDeep(response.data))
        
    } 

    const onError = () => {
    }
    const onTimeout = () => {

    }
      
    new AxiosClient(getjobs, onSuccessful, onError, onTimeout, true).get()
}

export const markMet = (jobId: string, onSuccess: MarkMetSuccessFunction, onFailed: MarkMetFailedFunction) => {
    const onSuccessful = (response: any) => {
       
        onSuccess()
        
    } 

    const onError = () => {
        onFailed()
    }
    const onTimeout = () => {

    }
      
    new AxiosClient(markmet, onSuccessful, onError, onTimeout, true).postWithoutConversion({jobId})
}
export const markDone = (jobId: string, onSuccess: MarkDoneSuccessFunction, onFailed: MarkDoneFailedFunction) => {
    const onSuccessful = (response: any) => {
       
        onSuccess()
        
    } 

    const onError = () => {
        onFailed()
    }
    const onTimeout = () => {

    }
      
    new AxiosClient(markdone, onSuccessful, onError, onTimeout, true).postWithoutConversion({jobId})
}