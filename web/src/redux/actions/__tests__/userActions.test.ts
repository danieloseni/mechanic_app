import { login as LoginAction, register } from '../userActions';
import * as AuthController from '../../../controllers/authentication';
import { LoginCredentials, RegistrationCredentials } from 'interfaces/authentication';
import { LoginSuccessFunction, LoginFailedFunction, RegisterSuccessFunction, RegisterFailedFunction } from 'types/authentication';
import { ADD_USER_INFO } from 'redux/types/user';

describe("tests the login user action", () => {

    it("passes the right data to the controller", () => {
        const mockLoginController = jest.fn((credentials: LoginCredentials, onSuccess: LoginSuccessFunction, onFailed: LoginFailedFunction, onWrongLogins?: () => void) => {

        })

        const dispatch = jest.fn((data) => { })

        jest.spyOn(AuthController, 'login').mockImplementation(mockLoginController)

        jest.mock('controllers/authentication', () => {
            const originalModule = jest.requireActual('../../../controllers/authentications');

            return {
                __esModule: true,
                ...originalModule,
                //   login: mockLoginController
            };
        });

        LoginAction({ email: "dan@gmail.com", password: "Here we go" }, () => { })(dispatch, () => { })

        expect(mockLoginController).toHaveBeenCalledWith({ email: "dan@gmail.com", password: "Here we go" }, expect.anything(), expect.anything(), expect.anything())
    })

    it("dispatches correct action on success", () => {
        const details = {
            firstname: "Daniel",
            lastname: "Oseni",
            email: "dan@gmail.com",
            userId: "2",
            phone: "24",
            token: "yyuuey",
            role: "client"
        }

        const mockLoginController = jest.fn((credentials: LoginCredentials, onSuccess: LoginSuccessFunction, onFailed: LoginFailedFunction, onWrongLogins?: () => void) => {
            onSuccess(details)
        })

        const dispatch = jest.fn((data) => { })

        jest.spyOn(AuthController, 'login').mockImplementation(mockLoginController)

        LoginAction({ email: "dan@gmail.com", password: "Here we go" }, () => { })(dispatch, () => { })

        expect(dispatch).toHaveBeenCalledWith({
            type: ADD_USER_INFO,
            payload: { details }
        })

        expect(localStorage.getItem("loggedin")).toBe("true")

    })

    it("calls onWrongLogins Function On WrongLogins", () => {
        const onWrongLogins = jest.fn();
        const mockLoginController = jest.fn((credentials: LoginCredentials, onSuccess: LoginSuccessFunction, onFailed: LoginFailedFunction, onWrongLogins?: () => void) => {
            onWrongLogins?.()
        })

        const dispatch = jest.fn((data) => { })

        jest.spyOn(AuthController, 'login').mockImplementation(mockLoginController)

        LoginAction({ email: "dan@gmail.com", password: "Here we go" }, onWrongLogins)(dispatch, () => { })

        expect(onWrongLogins).toHaveBeenCalled()
    })
})




describe("Registration action tests", () => {
    it("dispatches user info on success", () => {
        const credentials = {
            firstname: "Daniel",
            lastname: "Oseni",
            email: "megoseni0569@gmail.com",
            password: "23332828",
            phone: "34"
        }

        const onSuccessData = {
            token: "222",
            userId: "12",
            role: "client"
        }
        const dispatch = jest.fn((data) => { });

        const mockRegistrationFunction = jest.fn((credentials: RegistrationCredentials, role: "mechanic" | "client", onSuccess: RegisterSuccessFunction, onFailed: RegisterFailedFunction, onValidationError: () => void) => {
            onSuccess({
                ...credentials,
                token: "222",
                userId: "12",
                role: "client"
            })
        })

        jest.spyOn(AuthController, 'register').mockImplementation(mockRegistrationFunction)

        register(credentials, "client", () => { })(dispatch, () => { })

        expect(dispatch).toHaveBeenCalledWith({
            type: ADD_USER_INFO,
            payload: {
                details: {...credentials, ...onSuccessData}
            }
        })

        expect(localStorage.getItem("loggedin")).toBe("true")

    })

    it("calls onvalidation error on validation error", () => {
        const credentials = {
            firstname: "Daniel",
            lastname: "Oseni",
            email: "megoseni0569@gmail.com",
            password: "23332828",
            phone: "34"
        }

        const onValidationError = jest.fn()
        const mockRegistrationFunction = jest.fn((credentials: RegistrationCredentials, role: "mechanic" | "client", onSuccess: RegisterSuccessFunction, onFailed: RegisterFailedFunction, onValidationError: () => void) => {
            onValidationError()
        })

        jest.spyOn(AuthController, 'register').mockImplementation(mockRegistrationFunction)

        register(credentials, "client", onValidationError)(()=>{}, ()=>{})

        expect(onValidationError).toHaveBeenCalled()

    })

    it("passes the right data to the controller", () => {
        const credentials = {
            firstname: "Daniel",
            lastname: "Oseni",
            email: "megoseni0569@gmail.com",
            password: "23332828",
            phone: "34"
        }
        const role = "mechanic";

        const mockRegistrationFunction = jest.fn((credentials: RegistrationCredentials, role: "mechanic" | "client", onSuccess: RegisterSuccessFunction, onFailed: RegisterFailedFunction, onValidationError: () => void) => {
            
        })

        jest.spyOn(AuthController, "register").mockImplementation(mockRegistrationFunction)

        register(credentials, role, () => {})(() => {}, () => {})

        expect(mockRegistrationFunction).toHaveBeenCalledWith(credentials, role, expect.anything(), expect.anything(), expect.anything())
    })


})