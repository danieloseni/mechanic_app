import { UserInfo } from 'interfaces/authentication'
import React from 'react'
import { connect } from 'react-redux'
import Requests from './Requests'
import Map from 'components/Map/Map'

interface Props {
    user?: UserInfo
}

//@ts-ignore
const Home = ({user: {role}}: Props) => {
    console.log(role)    //@ts-ignore
   return role === "mechanic" ?
    (<Requests />)
    :
    (<Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB9CQiAzHM_ISxw6g2rLRn5hbSVpKih9a8&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
       
       />)
}

const mapStateToProps = (state:any) => ({
    user: state.user
})

export default connect(mapStateToProps, null)(Home)
