import { UserInfo } from 'interfaces/authentication'
import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import Jobs from './Jobs'
import Requests from './Requests'

interface Props {
    user?: UserInfo
}



//@ts-ignore
const Home = ({ user: { role } }: Props) => {
   
    return (
        <div className="main-pd">
            <div className="tabbed-view">
                <div className="tab-menu">
                    {role === "mechanic" &&
                        <>
                            <div className="item">
                                <Link to="/">Requests</Link>
                            </div>
                            <div className="item">
                                <Link to="/history">History</Link>
                            </div>
                        </>
                    }
                </div>

                <div className="view">
                    <Routes>


                        <Route path="/" element={
                            (
                                role === "mechanic" ? <Requests /> : <Jobs />
                            )
                        } />
                        <Route path="/history" element={
                            (
                                <Jobs />
                            )
                        } />

                    </Routes>
                </div>


            </div>


            {/* {role === "mechanic" ?
                (<Requests />)
                :
                (<Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB9CQiAzHM_ISxw6g2rLRn5hbSVpKih9a8&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100vh` }} />}
                    mapElement={<div style={{ height: `100%` }} />}

                />)} */}
        </div>)
}

const mapStateToProps = (state: any) => ({
    user: state.user
})

export default connect(mapStateToProps, null)(Home)
