import { UserInfo } from 'interfaces/authentication';
import React, { useState } from 'react'

interface Props {
    user?: UserInfo 
}

const AccountSettings = ({user}: Props) => {
    const [showPopup, updatePopupVisibility] = useState<boolean>(false);

    const hidePanel = () => {
        updatePopupVisibility(false)
    }

    const showPanel = () => {
        updatePopupVisibility(true)
    }
    return (
        <div className="account-settings">
            <div className="greeting">
                Hi, {user?.firstname}    
            </div>
            <div className="icon" onFocus={(e) => { showPanel() }} onBlur={(e) => { hidePanel() }} tabIndex={1}>
                <i className="fas fa-user"></i>


                <div className={`dropdown-menu ${(showPopup && "show")}`}>
                    <div className="item" onClick={(e) => { localStorage.setItem("loggedin", ""); window.location.href = "/login" }}>
                        Logout
                    </div>
                </div>
            </div>

            <div className="dropdown-button">
                <i className="fas fa-chevron-down"></i>
            </div>
        </div>
    )
}

export default AccountSettings
