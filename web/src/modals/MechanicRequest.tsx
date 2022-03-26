import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

interface Props {
}

const MechanicRequest = (props: Props) => {
    const navigate = useNavigate();
    const [firstname, updateFirstname] = useState<string>("");
    const [lastname, updateLastname] = useState<string>("");
    const [email, updateEmail] = useState<string>("");
    const [phone, updatePhone] = useState<string>("");
    const [id, updateId] = useState<string>("");
    const [sendRequest, updateSendRequestCallback] = useState<(id: string) => void | null>()
    const [show, updateShow] = useState<boolean>(false);

    const showPopup = (firstname: string, lastname: string, email: string, phone: string, id: string, sendRequest: (id: string) => void) => {

        updateFirstname(firstname)
        updateLastname(lastname)
        updateEmail(email)
        updatePhone(phone)
        updateId(id)
        updateSendRequestCallback(() => sendRequest)
        updateShow(true)

    }

    useEffect(() => {
        //@ts-ignore
        window.showRequestPopup = showPopup

        return () => {
            //@ts-ignore
            window.showRequestPopup = null
        }

    }, [])



    return (
        show ?

            <div className="blurred-modal">

                <div className="header">
                    <div className="close-button" onClick={e => { updateShow(false) }}>
                        X
                    </div>
                </div>

                <div className="modal-padded-box">

                    <div className='title'>{firstname} {lastname}</div>

                    <div className="contact-details">
                        <div className='contact-detail'>{email}</div>
                        <div className='contact-detail'>{phone}</div>
                    </div>

                    <div className="form-button-box">
                        <button className='cta' onClick={
                            (e) => {
                                sendRequest?.(id)
                                updateShow(false)
                            }
                        }>Send Request</button>
                    </div>


                </div>

            </div>

            :

            (<></>)
    )
}

export default MechanicRequest