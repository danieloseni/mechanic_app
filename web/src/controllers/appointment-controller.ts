import { AddAppointmentsFailedFunction, AddAppointmentsSuccessFunction, GetAppointmentsFailedFunction, GetAppointmentsSuccessFunction } from "types/appointment"
//@ts-ignore
import {cloneDeep} from 'lodash'
import AxiosClient from "adapters/ApiClient"
import { addappointment, getappointment } from "urls"
import { Appointment } from "interfaces/appointment"

export const getAppointments = (onSuccess: GetAppointmentsSuccessFunction, onFailed: GetAppointmentsFailedFunction) => {
    const onSuccessful = (response: any) => {
       
        onSuccess(cloneDeep(response.data))
        
    } 

    const onError = () => {
    }
    const onTimeout = () => {

    }
      
    new AxiosClient(getappointment, onSuccessful, onError, onTimeout, true).get()
}

export const addAppointment = (appointment: Appointment, onSuccess: AddAppointmentsSuccessFunction, onFailed: AddAppointmentsFailedFunction) => {
    const onSuccessful = (response: any) => {
        onSuccess()
        
    } 

    const onError = () => {
        onFailed()
    }
    const onTimeout = () => {

    }
      
    new AxiosClient(addappointment, onSuccessful, onError, onTimeout, true).postWithoutConversion(appointment)
}