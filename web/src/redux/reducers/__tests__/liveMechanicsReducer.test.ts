import { UPDATE_LIVE_MECHANICS_LIST } from "redux/types/mechanics";
import liveMechanicsReducer from "../liveMechanicsReducer";

describe("Tests for live mechanics reducer", () => {
    it("adds a list of mechanics to the list", () => {
        const mechanics = [
            {
                firstname: "Jude",
                lastname: "Oseni",
                email: "judeoseni@gmail.com",
                phone: "09078967856"
            }
        ]

        const newMechanicsList = liveMechanicsReducer([], 
            {
                type: UPDATE_LIVE_MECHANICS_LIST,
                payload: {
                    mechanics
                }
            })

            expect(newMechanicsList).toEqual(mechanics)
    })
})