import React, { useCallback, useEffect, useState } from 'react'
import MaintenanceDetails from './MaintenanceDetails';
import MechanicSelection from './MechanicSelection';
import { MechanicDetails } from './../../interfaces/mechanic';
import { addAppointment as AddAppointmentController } from 'controllers/appointment-controller';
import { useNavigate } from 'react-router-dom';

interface Props {

}

interface AppointmentDetails { service: string, address: string, date: string }

enum Progress { DETAILS_ENTERING, MECHANIC_SELECTION }

const MaintenanceContainer = (props: Props) => {
    const navigate = useNavigate();
    const [progress, updateProgress] = useState<Progress>(Progress.DETAILS_ENTERING)
    const [details, updateDetails] = useState<AppointmentDetails>();
    const [mechanicDetails, updateMechanicDetails] = useState<MechanicDetails>();

    const [displayModal, updateModalVisibility] = useState<boolean>(true);

    const submit = () => {
        hideModal()

        const appointment = {
            ...details!,
            mechanic: mechanicDetails!?.id
        }

        const onSuccess = () => {
            //@ts-ignore
            window.showPopup({
                status: "success",
                message: `Appointment placed successfully.`
                // message: `Appointment placed successfully. ${mechanicDetails?.firstname} ${mechanicDetails?.lastname} will be in touch.`
            })
            navigate("/")
        }

        const onFailed = () => {
            //@ts-ignore
            window.showPopup({
                status: "failed",
                message: `An error occured`
            })
        }

        AddAppointmentController(appointment, onSuccess, onFailed)

    }
    const onButtonClick = () => {
        if (progress === Progress.DETAILS_ENTERING) {
            updateProgress(Progress.MECHANIC_SELECTION)
        } else {
            setTimeout(() => {

                submit()
            }, 1000)
        }
    }

    const hideModal = () => {
        updateModalVisibility(false)
        updateProgress(Progress.DETAILS_ENTERING)
    }

    const showModal = useCallback(() => {
        updateModalVisibility(true)
    }, [])

    useEffect(() => {
        //@ts-ignore
        window.showMaintenanceModal = showModal
        return () => {
            //@ts-ignore
            window.showMaintenanceModal = null

        }
    }, [showModal])

    const onMechanicSelected = (detials: MechanicDetails) => {
        updateMechanicDetails(detials)
    }

    const onDetailsUpdated = (details: AppointmentDetails) => {
        updateDetails(details)
    }

    return displayModal ? (
        <div className='blurred-modal'>
            <div className="header">
                <div className="close-button" onClick={(e) => { navigate(-1) }}>
                    X
                </div>
            </div>

            <div className="maintenance-container">
                {
                    progress === Progress.DETAILS_ENTERING ?
                        <MaintenanceDetails {...{ onButtonClick, onDetailsUpdated }} />

                        :
                        <MechanicSelection {...{ onButtonClick, onMechanicSelected }} />

                }
            </div>

        </div>
    ) : <></>
}

export default MaintenanceContainer
