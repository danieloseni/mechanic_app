import React, { useCallback, useEffect, useState } from 'react'
import MaintenanceDetails from './MaintenanceDetails';
import MechanicSelection from './MechanicSelection';
import { MechanicDetails } from './../../interfaces/mechanic';

interface Props {

}

enum Progress { DETAILS_ENTERING, MECHANIC_SELECTION }

const MaintenanceContainer = (props: Props) => {
    const [progress, updateProgress] = useState<Progress>(Progress.DETAILS_ENTERING)

    const [displayModal, updateModalVisibility] = useState<boolean>(false);

    const submit = () => {
        hideModal()
    }
    const onButtonClick = () => {
        if (progress === Progress.DETAILS_ENTERING) {
            updateProgress(Progress.MECHANIC_SELECTION)
        }else{
            submit()
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

    }

    const onDetailsUpdated = (details: { service: string, address: { lat: number, lng: number }, date: string }) => {

    }

    return displayModal ? (
        <div className='blurred-modal'>
            <div className="header">
                <div className="close-button" onClick={(e) => { hideModal() }}>
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
