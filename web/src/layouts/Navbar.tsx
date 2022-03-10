import AccountSettings from 'components/account-settings/AccountSettings';
import { UserInfo } from 'interfaces/authentication';
import React from 'react'
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
    user?: UserInfo
}

const Navbar = ({ user }: Props) => {
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
                    <div className="icon active"><i className="fal fa-power-off"></i></div>

                    <div className="popup">

                        <div className="title">
                            Online
                        </div>

                        <div className="body">
                            Your location is currently being shared. Clients will know that you're online.
                        </div>

                        <div className="highlight">
                            Click the icon to turn this off
                        </div>

                    </div>
                </div>}

                <AccountSettings user={user} />
            </div>
        </nav>
    )
}


const mapStateToProps = (state: any) => ({
    user: state.user
})
export default connect(mapStateToProps, null)(Navbar)