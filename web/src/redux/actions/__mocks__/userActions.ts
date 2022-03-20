export const login = jest.fn().mockImplementation((credentials, onWrongLogins) => {
    return (dispatch:any,getState:any) => {
        console.log("got here")
    }
})