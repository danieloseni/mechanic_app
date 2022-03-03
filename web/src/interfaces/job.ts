import { MechanicDetails } from "./mechanic";
import { VehicleDetails } from "./vehicle";

export interface Job{
    userId: string,
    vehicleId: VehicleDetails,
    assignedMechanic: MechanicDetails,
    dateCreated: string,
    dateAssigned: string

}
