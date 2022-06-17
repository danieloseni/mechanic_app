import { LiveLocationReducer } from '../liveLocationReducer';
import { UPDATE_LIVE_LOCATION_STATE } from '../../types/liveLocation';

describe("live location reducer test", () => {
    it("updates the live location watch state of the application", () => {
        const updateLiveLocationState = LiveLocationReducer({liveLocationActive: true}, {
            type: UPDATE_LIVE_LOCATION_STATE,
            payload: {
                state: false
            }
        });

        expect(updateLiveLocationState).toEqual({liveLocationActive: false})
    })
})