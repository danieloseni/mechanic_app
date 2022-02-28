import { VehicleDetails } from "interfaces/vehicle";
import { addVehicle as AddVehicleController, getVehicles as GetVehiclesController } from "controllers/vehicle-controller";
import { ADD_VEHICLE, ADD_VEHICLES } from "redux/types/vehicle";
export const addVehicle = (details: VehicleDetails, onDone: (() => void) | null = null, onError: (() => void) | null = null) => {

    return (dispatch:any, getState:any) => {
        const onSuccess = (details: VehicleDetails) => {
            dispatch({
                type: ADD_VEHICLE,
                payload: {
                    details
                }
            })

            onDone?.()
        }
        
        const onFailed = () => {
            onError?.()
        }

        AddVehicleController(details, onSuccess, onFailed);
    }
}

export const getVehicles = () => {

    return (dispatch:any, getState:any) => {
        const onSuccess = (vehicles: VehicleDetails[]) => {
            dispatch({
                type: ADD_VEHICLES,
                payload: {
                    vehicles
                }
            })

            
        }
        
        const onFailed = () => {
           
        }

        GetVehiclesController(onSuccess, onFailed);
    }
}