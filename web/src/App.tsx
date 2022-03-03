import LiveLocation from 'controllers/live-location-controller';
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getLiveMechanics } from 'redux/actions/mechanicActions';
import AddCar from 'views/AddCar';
import ClientRegister from 'views/authentication/ClientRegister';
import Login from 'views/authentication/Login';
import MechanicRegister from 'views/authentication/MechanicRegister';
import ListMechanics from 'views/ListMechanics';
import ListVehicles from 'views/ListVehicles';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Requests from 'views/Requests';
import Home from 'views/Home';
import Jobs from 'views/Jobs';
function App({getlivemechanics, user: {role}}:any) {

  const AuthOnlyRoute = (Element: any, mustHaveRole:string | null=null) => {
    if(localStorage.getItem("loggedin") !== "true" || (mustHaveRole !== null && mustHaveRole !== role)){
      return (<Navigate to = "/login" replace={true} />)

    }else{
      return (Element);
    }
    
  }

  const UnAuthOnlyRoute = (Element: any) => {
    if(localStorage.getItem("loggedin") !== "true"){
      return (Element);
    }else{
      return (<Navigate to = "/" replace={true} />)
    }
  }

  useEffect(() => {
      LiveLocation.startLocationBroadcast()
      getlivemechanics()
  }, [getlivemechanics])
  return (
    <Router >
        {/* <Login /> */}
        <Routes>
            <Route path="/login" element={UnAuthOnlyRoute(<Login />)} />
            <Route path="/mechanics/register" element={UnAuthOnlyRoute(<MechanicRegister />)} />
            <Route path="/register" element={UnAuthOnlyRoute(<ClientRegister />)} />
            <Route path="/vehicles" element={AuthOnlyRoute(<ListVehicles />, "client")} />
            <Route path="/mechanics" element={AuthOnlyRoute(<ListMechanics />)} />
            <Route path="/add-vehicle" element={AuthOnlyRoute(<AddCar />, "client")} />
            <Route path="/jobs" element={AuthOnlyRoute(<Jobs />)} />
            <Route path="/requests" element={AuthOnlyRoute(<Requests />, "mechanic")} />
            <Route path="/" element={AuthOnlyRoute(<Home />)} />
        </Routes>
      

    </Router>
      
  );
}


const mapStateToProps = (state:any) => ({
  user: state.user
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    getlivemechanics: () => {dispatch<any>(getLiveMechanics())}
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
