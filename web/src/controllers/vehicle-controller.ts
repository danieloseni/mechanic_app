import AxiosClient from 'adapters/ApiClient';
import { AddVehicleFailedFunction, AddVehicleSuccessFunction, GetVehiclesFailedFunction, GetVehiclesSuccessFunction } from 'types/vehicle';
import { addvehicle } from 'urls';
import { VehicleDetails } from './../interfaces/vehicle';
//@ts-ignore
import {cloneDeep} from 'lodash';

export const addVehicle = (details: VehicleDetails, onSuccess: AddVehicleSuccessFunction, onFailed: AddVehicleFailedFunction) => {
    const onSuccessful = (response:any) => {

        const {brand, color, make, model, plateNumber, _id:id} = response.data;
        onSuccess({
            brand, make, color, model, plateNumber, id
        }) 
    }

    const onError = (error:any) => {

    }

    const onTimeout = () => {

    }

    new AxiosClient(addvehicle, onSuccessful, onError, onTimeout, true).postWithoutConversion(details);
    
}

export const getVehicles = (onSuccess: GetVehiclesSuccessFunction, onFailed: GetVehiclesFailedFunction) => {
    const onSuccessful = (response:any) => {
        onSuccess(cloneDeep((response.data)?.map?.((vehicle:any) => {
            const {brand, color, make, model, plateNumber, _id:id} = vehicle

            return {
                    brand, make, color, model, plateNumber, id
                }
        })))
        // const {brand, color, make, model, plateNumber, _id:id} = response.data;
        // onSuccess({
        //     brand, make, color, model, plateNumber, id
        // }) 
    }

    const onError = (error:any) => {

    }

    const onTimeout = () => {

    }

    new AxiosClient(addvehicle, onSuccessful, onError, onTimeout, true).get();
    
}