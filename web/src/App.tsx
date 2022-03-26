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
import 'scss/style.scss';
import MechanicRequest from 'modals/MechanicRequest';
import SelectiveNavbarRenderer from 'components/selective-renderers/SelectiveNavbarRenderer';
import Map from 'components/Map/Map'
import Landing from 'views/Landing';
import { FAQ } from 'views/FAQ';
import { Terms } from 'views/Terms';
import { PrivacyPolicy } from 'views/PrivacyPolicy';
import MaintenanceContainer from 'modals/maintenance/MaintenanceContainer';
import AlertPopup from 'modals/alert-popup/AlertPopup';
import ContactUs from 'modals/contact-us/ContactUs';
import TowService from 'modals/tow-service/TowService';

function App({getlivemechanics, user: {role}}:any) {
  document.title="Fixit - High quality mechanics at your fingers"
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
      //@ts-ignore
      if(window.executeAfterLogin !== null && localStorage.getItem('loggedin') === "true"){
        //@ts-ignore
          window.executeAfterLogin?.()
          //@ts-ignore
          window.executeAfterLogin = null
      }

    
  }, [getlivemechanics])
  return (
    <Router >
        {/* <Login /> */}
        <SelectiveNavbarRenderer />
        <MechanicRequest />
        <AlertPopup />
        <ContactUs />
        <TowService />
        <Routes>

            <Route path="/login" element={UnAuthOnlyRoute(<Login />)} />
            <Route path="/mechanics/register" element={UnAuthOnlyRoute(<MechanicRegister />)} />
            <Route path="/register" element={UnAuthOnlyRoute(<ClientRegister />)} />
            <Route path="/vehicles" element={AuthOnlyRoute(<ListVehicles />, "client")} />
            <Route path="/mechanics" element={AuthOnlyRoute(<ListMechanics />)} />
            <Route path="/add-vehicle" element={AuthOnlyRoute(<AddCar />, "client")} />
            <Route path="/jobs" element={AuthOnlyRoute(<Jobs />)} />
            <Route path="/requests" element={AuthOnlyRoute(<Requests />, "mechanic")} />
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<Landing />} />
            <Route path="/services" element={<Landing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/book-appointment" element={AuthOnlyRoute(<MaintenanceContainer />)} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/send-request" element={AuthOnlyRoute(<Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB9CQiAzHM_ISxw6g2rLRn5hbSVpKih9a8&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100vh` }} />}
                    mapElement={<div style={{ height: `100%` }} />}

                />, "client")} />
            <Route path="/dashboard/*" element={AuthOnlyRoute(<Home />)} />
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
