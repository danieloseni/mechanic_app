import { RegistrationCredentials, UserInfo } from 'interfaces/authentication';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { register as registerAction } from 'redux/actions/userActions';

interface Props {
  register?: (credentials: RegistrationCredentials, onValidationError: () => void) => void,
  user?: UserInfo
}

const MechanicRegister = ({ register, user }: Props) => {
  const [email, updateEmail] = useState<string>("");
  const [password, updatePassword] = useState<string>("");
  const [firstname, updateFirstname] = useState<string>("");
  const [lastname, updateLastname] = useState<string>("");
  const [phone, updatePhone] = useState<string>("");
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
    updateLoadingStatus(true)

    updateError("")

    const onValidationError = () => {
        updateLoadingStatus(false)
        updateError("Ensure all fields are properly filled")
    }

    if(!loading)
    register?.({
      email, password, firstname, lastname, phone
    }, onValidationError)
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
          Create mechanic account
        </div>
        <form onSubmit={onSubmit}>
          <div className="fe-group">

            <div className="fe-element">
              <label>Firstname</label>
              <input type="text" name="firstname" value={firstname} onChange={onChange} />
            </div>


            <div className="fe-element">
              <label>Lastname</label>
              <input type="text" name="lastname" value={lastname} onChange={onChange} />
            </div>


            <div className="fe-element">
              <label>Phone Number</label>
              <input type="text" name="phone" value={phone} onChange={onChange} />
            </div>


            <div className="fe-element">
              <label>Email</label>
              <input type="text" name="email" value={email} onChange={onChange} />
            </div>


            <div className="fe-element">
              <label>Password</label>
              <input type="password" name="password" value={password} onChange={onChange} />
            </div>

            <div className="fe-element">
              <label>Tell us a bit about yourself</label>
              <input type="text" name="description"
              // value={email} onChange={onChange}
              />
            </div>

            {error && error?.trim?.() !== "" &&<div className="error-text">
                        {error}
                            </div>}

            <div className="form-button-box"><button className="cta">{loading ? "Hold on..." : "Create account"}</button></div>

            <div className="alternate-action-box space-between 
                    ">

              <Link to="/register" className="primary-text no-decoration">Create a regular account</Link>
              <Link to="/login" className="primary-text no-decoration">Sign in</Link>
            </div>
          </div>
        </form>
      </div>

    </div>)
}


const mapStateToProps = (state: any) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch: any) => ({
  register: (credentials: RegistrationCredentials, onValidationError: () => void) => { dispatch(registerAction(credentials, "mechanic", onValidationError)) }
})


export default connect(mapStateToProps, mapDispatchToProps)(MechanicRegister)
