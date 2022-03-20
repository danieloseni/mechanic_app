import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Login from '../Login';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
jest.mock('../../../redux/actions/userActions')
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
        })
        it("password label is rendered", () => {
            render(<ReturnWIthProvider>
                <Login />
            </ReturnWIthProvider>)

            const passwordLabel = screen.getByLabelText(/password/i);
            expect(passwordLabel).toBeInTheDocument()
        })

        it("Email textbox is rendered", () => {
            render(<ReturnWIthProvider>
                <Login />
            </ReturnWIthProvider>)

            const emailText = screen.getByTestId("email-textbox");
            expect(emailText).toBeInTheDocument()
        })

        it("Password textbox is rendered", () => {
            render(<ReturnWIthProvider>
                <Login />
            </ReturnWIthProvider>)
            const passwordText = screen.getByTestId("password-textbox");
            expect(passwordText).toBeInTheDocument()
        })

        it("Sign in button is visible", () => {
            render(<ReturnWIthProvider>
                <Login />
            </ReturnWIthProvider>)
            const signinButton = screen.getByRole("button", {
                name: /sign in/i
            })
            expect(signinButton).toBeVisible()
        })

        it("Create account Link is visible", () => {
            render(<ReturnWIthProvider>
                <Login />
            </ReturnWIthProvider>)
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
                target: {value: "dandan@gmail.com"}
            })

            expect(emailTextBox.value).toBe("dandan@gmail.com")
        })

        it("Password Textbox displays value that is being entered", () => {
            render(<ReturnWIthProvider>
                <Login />
            </ReturnWIthProvider>)
            const passwordTextbox = screen.getByTestId("email-textbox") as HTMLInputElement

            fireEvent.change(passwordTextbox, {
                target: {value: "dandanpassword"}
            })

            expect(passwordTextbox.value).toBe("dandanpassword")
        })

        it("Form Submits on signin button click", () => {
            render(<ReturnWIthProvider>
                <Login />
            </ReturnWIthProvider>)

            const signinButton = screen.getByRole('button', {name: /sign in/i});
            const form= screen.getByTestId("login-form") as HTMLFormElement;

            const onsubmit = jest.fn();

            form.onsubmit = onsubmit

            fireEvent.click(signinButton)

            expect(onsubmit).toHaveBeenCalled()
        
        })

        it("Loading status is changed on form submit", () => {
            render(<ReturnWIthProvider>
                <Login />
            </ReturnWIthProvider>)

            const signinButton = screen.getByRole('button', {name: /sign in/i});
            //const form= screen.getByTestId("login-form") as HTMLFormElement;

            fireEvent.click(signinButton)

            const newSignInButton = screen.getByRole('button', {name: /hold on.../i})

            expect(newSignInButton).toBeVisible()
        
        })
    })
})