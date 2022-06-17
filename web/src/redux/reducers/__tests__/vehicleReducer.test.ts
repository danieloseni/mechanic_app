import { ADD_VEHICLE, ADD_VEHICLES } from "redux/types/vehicle";
import { vehicleReducer } from "../vehicleReducer";

describe("Tests for vehicle reducer", () => {
    it("adds a new vehicle to the list", () => {
        const vehicle = {
            brand: "Benz",
            make: "ML350",
            model: "2016",
            plateNumber: "76X-675-098",
            color: "black",
            id: "24"
        }

        const result = vehicleReducer([], {
            type: ADD_VEHICLE,
            payload: {
                details: vehicle                    
            }
        })

        expect(result[0]).toEqual(vehicle)
    })

    it("adds a list of vehicles to the list", () => {
        const vehicles = [
            {
            brand: "Benz",
            make: "ML350",
            model: "2016",
            plateNumber: "76X-675-098",
            color: "black",
            id: "24"
        },
            {
            brand: "Benzes",
            make: "ML350",
            model: "2016",
            plateNumber: "76X-675-098",
            color: "black",
            id: "24"
        },
    ]

        const result = vehicleReducer([], {
            type: ADD_VEHICLES,
            payload: {
                vehicles                    
            }
        })

        expect(result).toEqual(vehicles)
    })
})