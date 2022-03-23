import AccountSettings from 'components/account-settings/AccountSettings';
import { UserInfo } from 'interfaces/authentication';
import React from 'react'
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { turnOnOrOffLiveLocation } from 'redux/actions/liveLocationAction';

interface Props {
    user?: UserInfo,
    changeLiveLocationState?: (state:boolean) => void,
    liveLocation?:boolean
}

const Navbar = ({ user, changeLiveLocationState, liveLocation  }: Props) => {
    const navigation = useNavigate();
    return (
        <nav>
            <div className="logo">
                <Link to="/">
                    Fixit
                </Link>
            </div>

            <div className="g-8 flex align-items-center">
                {user?.role === "client" && <div className="cta rounded-cta" onClick={(e) => { navigation("/vehicles") }}>
                    Request Mechanic
                </div>}

                {user?.role === "mechanic" && <div className="live-location">
                    <div className={"icon " + (liveLocation && "active")} onClick = {e => {changeLiveLocationState?.(!liveLocation)}}><i className="fal fa-power-off"></i></div>

                    <div className="popup">

                        <div className="title">
                            {liveLocation ? "Online" : "Offline"}
                        </div>

                        <div className="body">
                            {liveLocation ? "Your location is currently being shared. Clients will know that you're online." : "Your location is not currently being shared. Clients will not know that you're online."}
                        </div>

                        <div className="highlight">
                            {liveLocation ? "Click the icon to turn this off" : "Click the icon to turn this on"}
                        </div>

                    </div>
                </div>}

                <AccountSettings user={user} />
            </div>
        </nav>
    )
}


const mapStateToProps = (state: any) => ({
    user: state.user,
    liveLocation: state.liveLocation?.liveLocationActive
})

const mapDispatchToProps = (dispatch:any) => ({
    changeLiveLocationState: (state:boolean) => {dispatch(turnOnOrOffLiveLocation(state))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)