import { MechanicDetails } from "./mechanic";
import { VehicleDetails } from "./vehicle";

export interface Job{
    _id: string,
    id?: string,
    userId: {
        firstname: string,
        lastname: string,
        email: string,
        phone: string
    },
    vehicleId: VehicleDetails,
    assignedMechanic: MechanicDetails,
    dateCreated: string,
    dateAssigned: string,
    done: boolean,
    met: boolean

}
