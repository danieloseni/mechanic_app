const jwt  = require('jsonwebtoken');

const {createToken} = require('../client') 

describe("Create Token Function Test", () => {
    it("properly encodes the data in the jwt", () => {
        const jwt = createToken(24);

        jwt.verify(jwt, "A good man never hits a woman Because true power doesn\'t let little things get to them Only the weak see the needd to fight and hit people in every little situation", async (err:any, decodedToken:any) => {
            if(!err){
                expect(decodedToken?.id).toBe(24)
            }
        })
    })
})