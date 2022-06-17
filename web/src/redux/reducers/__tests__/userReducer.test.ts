import { ADD_USER_INFO } from 'redux/types/user';
import userReducer from '../userReducer';

describe("user reducer tests", () => {
    it('adds user information to the state', () => {
        const userInfo = {
            userId: "24",
            firstname: "Daniel",
            lastname: "Oseni",
            email: "megoseni0569@gmail.com",
            phone: "09060985961",
            token: "ejweiwnkafkasfasklfjasjfk",
            role: "client"
        }

        const addedInfo = userReducer({}, 
            {
                type: ADD_USER_INFO,
                payload: {
                    details: userInfo
                }
            }    
        )

        expect(addedInfo).toEqual(userInfo)
    })
})