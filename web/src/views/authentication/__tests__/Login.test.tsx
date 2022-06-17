import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Login } from '../Login';
import LoginDefault from '../Login';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { LoginCredentials } from 'interfaces/authentication';
//@ts-ignore
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as userActions from 'redux/actions/userActions';

configure({ adapter: new Adapter() });

const ReturnWIthProvider = ({ children }: any) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router>
                    {children}

                </Router>
            </PersistGate>
        </Provider>
    )
}

describe("Login Page Tests", () => {



    describe("Necessary components are rendered", () => {

        it("Email label is rendered", () => {
            render(<ReturnWIthProvider>
                <Login />
            </ReturnWIthProvider>)

            const emailLabel = screen.getByText(/email/i);
            expect(emailLabel).toBeInTheDocument()
            const passwordLabel = screen.getByLabelText(/password/i);
            expect(passwordLabel).toBeInTheDocument()
            const emailText = screen.getByTestId("email-textbox");
            expect(emailText).toBeInTheDocument()
            const passwordText = screen.getByTestId("password-textbox");
            expect(passwordText).toBeInTheDocument()
            const signinButton = screen.getByRole("button", {
                name: /sign in/i
            })
            expect(signinButton).toBeVisible()
            const createAccountLink = screen.getByText(/create one/i)
            expect(createAccountLink).toBeVisible()
        })

    })



    describe("Components events function properly", () => {

        it("Email Textbox displays value that is being entered", () => {
            render(<ReturnWIthProvider>
                <Login />
            </ReturnWIthProvider>)
            const emailTextBox = screen.getByTestId("email-textbox") as HTMLInputElement

            fireEvent.change(emailTextBox, {
                target: { value: "dandan@gmail.com" }
            })

            expect(emailTextBox.value).toBe("dandan@gmail.com")
        })

        it("Password Textbox displays value that is being entered", () => {
            render(<ReturnWIthProvider>
                <Login />
            </ReturnWIthProvider>)
            const passwordTextbox = screen.getByTestId("email-textbox") as HTMLInputElement

            fireEvent.change(passwordTextbox, {
                target: { value: "dandanpassword" }
            })

            expect(passwordTextbox.value).toBe("dandanpassword")
        })

        it("Form Submits on signin button click", () => {
            render(<ReturnWIthProvider>
                <Login />
            </ReturnWIthProvider>)

            const signinButton = screen.getByRole('button', { name: /sign in/i });
            const form = screen.getByTestId("login-form") as HTMLFormElement;

            const onsubmit = jest.fn();

            form.onsubmit = onsubmit

            fireEvent.click(signinButton)

            expect(onsubmit).toHaveBeenCalled()

        })

        it("Loading status is changed on form submit", () => {
            render(<ReturnWIthProvider>
                <Login />
            </ReturnWIthProvider>)

            const signinButton = screen.getByRole('button', { name: /sign in/i });
            //const form= screen.getByTestId("login-form") as HTMLFormElement;

            fireEvent.click(signinButton)

            const newSignInButton = screen.getByRole('button', { name: /hold on.../i })

            expect(newSignInButton).toBeVisible()

        })

        it("Sends the right data on button click", () => {

            const login = jest.fn((credentials: LoginCredentials, onWrongLogins?: () => void) => { })

            render(
                <ReturnWIthProvider>
                    <Login login={login} />

                </ReturnWIthProvider>
            )

            const emailTextBox = screen.getByTestId("email-textbox") as HTMLInputElement

            fireEvent.change(emailTextBox, {
                target: { value: "dandan@gmail.com" }
            })

            const passwordTextbox = screen.getByTestId("password-textbox") as HTMLInputElement

            fireEvent.change(passwordTextbox, {
                target: { value: "dandanpassword" }
            })


            const signinButton = screen.getByRole('button', { name: /sign in/i });
            //const form= screen.getByTestId("login-form") as HTMLFormElement;

            fireEvent.click(signinButton)

            expect(login).toHaveBeenCalledWith({ email: "dandan@gmail.com", password: "dandanpassword" }, expect.anything())
        })

        it("Displays error message on wrong logins", () => {

            const login = jest.fn((credentials: LoginCredentials, onWrongLogins?: () => void) => { })

            render(
                <ReturnWIthProvider>
                    <Login login={login} />

                </ReturnWIthProvider>
            )

            const signinButton = screen.getByRole('button', { name: /sign in/i });
            //const form= screen.getByTestId("login-form") as HTMLFormElement;

            fireEvent.click(signinButton)
            act(() => {
                /* fire events that update state */
                login.mock.calls[0][1]?.()
            });

            const errorMessage = screen.getByText("You have entered incorrect credentials")

            expect(errorMessage).toBeInTheDocument()


        })
    })




    //Integration tests

    it("dispatches login action upon submitting the form", () => {
        const loginAct = jest.spyOn(userActions, 'login').mockReturnValue((dispatch: any, getState: any) => { });
        
        render(<ReturnWIthProvider>
            <LoginDefault />
        </ReturnWIthProvider>)

        const emailTextBox = screen.getByTestId("email-textbox") as HTMLInputElement

        fireEvent.change(emailTextBox, {
            target: { value: "dandan@gmail.com" }
        })

        const passwordTextbox = screen.getByTestId("password-textbox") as HTMLInputElement

        fireEvent.change(passwordTextbox, {
            target: { value: "dandanpassword" }
        })
        const signinButton = screen.getByRole('button', { name: /sign in/i });
        fireEvent.click(signinButton);


        expect(loginAct).toHaveBeenCalledWith({
            email: "dandan@gmail.com",
            password: "dandanpassword"
        }, expect.anything())
    })


})