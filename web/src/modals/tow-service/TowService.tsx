import React, { useCallback, useEffect, useState } from 'react'

interface Props {
    
}

const TowService = (props: Props) => {

    const [displayModal, updateModalVisibility] = useState<boolean>(false);

    const showModal = useCallback(() => {
        updateModalVisibility(true)
    }, [])

    const hideModal = () => {
        updateModalVisibility(false)
    }

    useEffect(() => {
        //@ts-ignore
        window.showTowServiceModal = showModal

        return () => {
            //@ts-ignore
            window.showTowServiceModal = null
        }
    }, [showModal])

    
    return displayModal ? (

        <div className='blurred-modal'>
            <div className="header">
                <div className="close-button" onClick={(e) => { hideModal() }}>
                    X
                </div>
            </div>



            <div className="contact__modal modal-padded-box">
                <div className="title">
                    Tow Service Contacts
                </div>

                <div className="detail-box">
                    <div className="detail">
                        <div className="icon"><i className="fal fa-phone"></i></div>
                        adaezeokezie08@gmail.com
                    </div>

                    <div className="detail">
                        <div className="icon"><i className="fal fa-envelope"></i></div>
                        adaezeokezie08@gmail.com
                    </div>

                  

                </div>
            </div>
        </div>

    ) : <></>
}

export default TowService
