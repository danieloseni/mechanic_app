import { LoginCredentials, UserInfo } from 'interfaces/authentication';
import React, { FormEvent, ReactElement, useState } from 'react'
import { ChangeEvent } from 'react';
import { login as loginAction } from 'redux/actions/userActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

type Props = {
    login?: (credentials: LoginCredentials, onWrongLogins?: () => void) => void,
    user?: UserInfo
}

const Login = ({ login, user }: Props): ReactElement => {

    const [email, updateEmail] = useState<string>("");
    const [password, updatePassword] = useState<string>("");
    const [loading, updateLoadingStatus] = useState<boolean>(false);
    const [error, updateError] = useState<string>("");

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "email":
                updateEmail(e.target.value);
                break;
            case "password":
                updatePassword(e.target.value);
                break;
        }
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateLoadingStatus(true)
        updateError("")

        const onWrongLogins = () => {
            updateLoadingStatus(false)
            updateError("You have entered incorrect credentials")
        }
        
        if(!loading)
        login?.({
            email, password
        }, onWrongLogins)
    }

    return (
        <div className="main flex flex-column align-items-center">
            <div className="auth-nav">
                <div className="logo">
                    fixit
                </div>
            </div>

            <div className="padded-box">
                <div className="title">
                    Sign into your account
                </div>

                <form onSubmit={onSubmit} data-testid="login-form">
                    <div className="fe-group">

                        <div className="fe-element">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" data-testid="email-textbox" name="email" value={email} onChange={onChange} />
                        </div>


                        <div className="fe-element">
                            <label htmlFor='password'>Password</label>
                            <input type="password" id="password" name="password" data-testid="password-textbox" value={password} onChange={onChange} />
                        </div>

                        {error && error?.trim?.() !== "" &&<div className="error-text">
                        {error}
                            </div>}

                        <div className="form-button-box"><button className="cta">{loading ? "Hold on..." : "Sign in"}</button></div>
                    </div>

                    <div className="alternate-action-box">
                        Don't have an account? 
                        <div className="alternate-options-popup">
                               <div className="option">
                                    <Link to="/register">Create a regular account</Link>
                                </div>
                               <div className="option">
                                    <Link to="/mechanics/register">Create a mechanic account</Link>
                                </div>
                            </div>
                        <span className="primary-text pointer">Create one
                        </span>
                        
                    </div>

                </form>

            </div>

        </div>
    )
}

const mapStateToProps = (state: any) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: any) => ({
    login: (credentials: LoginCredentials, onWrongLogins?: () => void) => { dispatch(loginAction(credentials, onWrongLogins)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)