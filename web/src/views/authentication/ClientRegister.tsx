import { RegistrationCredentials, UserInfo } from 'interfaces/authentication';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { connect } from 'react-redux';
import {register as registerAction} from 'redux/actions/userActions';

interface Props {
    register?: (credentials: RegistrationCredentials) => void,
    user?: UserInfo
}

const ClientRegister = ({register, user}: Props) => {
    const [email, updateEmail] = useState<string>("");
  const [password, updatePassword] = useState<string>("");
  const [firstname, updateFirstname] = useState<string>("");
  const [lastname, updateLastname] = useState<string>("");
  const [phone, updatePhone] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch(e.target.name){
            case "email":
                updateEmail(e.target.value);
                break;
            case "password":
                updatePassword(e.target.value);
                break;
            case "firstname":
                updateFirstname(e.target.value);
                break;
            case "lastname":
                updateLastname(e.target.value);
                break;
            case "phone":
                updatePhone(e.target.value);
                break;
            
        }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        
      e.preventDefault();
        register?.({
            email, password, firstname, lastname,  phone
        })
  }

  return (
    <div>
       
        <form onSubmit={onSubmit}>
            <div>Firstname</div>
            <input type="text" name="firstname" value={firstname} onChange={onChange} />

            <br />
            <div>Lastname</div>
            <input type="text" name="lastname" value={lastname} onChange={onChange} />

            <br />
            <div>Phone Number</div>
            <input type="text" name="email" value={email} onChange={onChange} />

            <br />
            <div>Email</div>
            <input type="text" name="phone" value={phone} onChange={onChange} />

            <br />
            <div>Password</div>
            <input type="password" name="password" value={password} onChange={onChange} />

            <br />
            <button>Done</button>
        </form>
    </div>)
}

const mapStateToProps = (state:any) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch:any) => ({
    register: (credentials: RegistrationCredentials) => {dispatch(registerAction(credentials, "client"))}
})


export default connect(mapStateToProps, mapDispatchToProps)(ClientRegister)
