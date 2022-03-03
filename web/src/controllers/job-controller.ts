import AxiosClient from "adapters/ApiClient";
import { CreateJobFailedFunction, CreateJobSuccessFunction, GetJobFailedFunction, GetJobSuccessFunction } from "types/job";
import { createjob, getjobs } from "urls";
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