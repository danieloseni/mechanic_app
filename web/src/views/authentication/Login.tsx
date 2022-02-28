import { LoginCredentials, UserInfo } from 'interfaces/authentication';
import React, { FormEvent, ReactElement, useState } from 'react'
import { ChangeEvent } from 'react';
import { login as loginAction } from 'redux/actions/userActions';
import {connect} from 'react-redux';

type Props = {
    login?: (credentials: LoginCredentials) => void,
    user?: UserInfo
}

const Login = ({login, user}: Props):ReactElement => {

  const [email, updateEmail] = useState<string>("");
  const [password, updatePassword] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch(e.target.name){
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
        login?.({
            email, password
        })
  }

  return (
    <div>
       
        <form onSubmit={onSubmit}>
            <div>Email</div>
            <input type="text" name="email" value={email} onChange={onChange} />

            <br />
            <div>Password</div>
            <input type="password" name="password" value={password} onChange={onChange} />

            <br />
            <button>Done</button>
        </form>
    </div>
  )
}

const mapStateToProps = (state:any) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch:any) => ({
    login: (credentials: LoginCredentials) => {dispatch(loginAction(credentials))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)