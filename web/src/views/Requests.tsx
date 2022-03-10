import React, { useState, useEffect, useCallback } from 'react'
import { VehicleDetails } from 'interfaces/vehicle';
import { UserInfo } from 'interfaces/authentication';
import { connect } from 'react-redux';
//@ts-ignore
import { cloneDeep } from 'lodash'
//@ts-ignore
import { v4 } from 'uuid'
import { getRequests } from 'adapters/firebase/firestore';
import { rejectRequest as RejectRequestController, acceptRequest as AcceptRequestController } from 'controllers/mechanic-controller';
type Props = {
    user?: UserInfo
}
interface ClientWithId extends UserInfo {
    id: string
}



interface Request {
    client: ClientWithId,
    declined: boolean,
    jobId: string,
    mechanicId: string,
    vehicle: VehicleDetails,
    key?: string

}

const Requests = ({ user }: Props) => {
    const [requests, updateRequests] = useState<Request[]>([]);
    const getUserRequests = useCallback(() => {
        const onData = (data: any) => {
            const jobGroups = Object.values(data);
            
            let requests: Request[] = [];
            jobGroups.forEach((job: any) => {
                const values = Object.values(job);
                (values as Request[]).forEach((request, index) => {
    
                    if (request.mechanicId === user?.userId && request.declined === false) {
                        
                        requests.push(cloneDeep({ ...request, key: v4() }))
                    }
                })
            })
            
           
            updateRequests(requests);
        }

        getRequests(onData)

    }, [user?.userId])

    const rejectRequest = (jobId: string, clientId: string) => {
        const onSuccess = () => {
            updateRequests(cloneDeep(requests?.filter(request => request.client.id !== clientId)))
        }

        const onFailed = () => {

        } 

        RejectRequestController(jobId, onSuccess, onFailed)
    }

    const acceptRequest = (jobId: string, clientId: string) => {
        const onSuccess = () => {
            updateRequests(cloneDeep(requests?.filter(request => request?.client?.id !== clientId)))
        }

        const onFailed = () => {

        } 

        AcceptRequestController(jobId, onSuccess, onFailed)
    }


  
    const containerStyle = {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        
    }

    useEffect(() => {
        getUserRequests()
    }, [getUserRequests])

    return (
        <>
            <div className='title'>Requests</div>

            {/*@ts-ignore*/}
            <div style={containerStyle}>
                {
                    /*@ts-ignore*/
                    requests?.length > 0 ?
                    requests?.map(({jobId, key, client: { firstname, lastname, email, phone, id }, vehicle: {brand, make, model, color, plateNumber}}) => (
                        <div className="modal-padded-box request-popup" key={key}  >
                            
                            <div className='title'>{firstname} {lastname}</div>
                            
                            <div className='details'>{color} {brand} {make} {model} Model</div>
                           
                            <div className="flex g-2 contact-details">
                                <div className='contact-detail'>{email}</div>
                                <div className='contact-detail'>{phone}</div>
                            </div>

                            <div className="flex g-2 form-button-box">
                                <button className='reject-request-button cta' onClick={(e) => {rejectRequest(jobId, id)}}>Reject</button>
                                <button className='accept-button cta' onClick={(e) => {acceptRequest(jobId, id)}}>Accept</button>
                            </div>
                        </div>
                    ))
                    :

                    <div>You have no active requests</div>
                }
            </div>



        </>
    )
}

const mapStateToProps = (state: any) => ({
    user: state.user
})

export default connect(mapStateToProps, null)(Requests)