import { VehicleDetails } from "interfaces/vehicle";

export type AddVehicleSuccessFunction = (vehicle: VehicleDetails) => void
export type AddVehicleFailedFunction = () => void

export type GetVehiclesSuccessFunction = (vehicles: VehicleDetails[]) => void
export type GetVehiclesFailedFunction = () => void