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
    const [requests, updateRequests] = useState<Request[]>();
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

    const rejectRequest = (jobId: string) => {
        const onSuccess = () => {

        }

        const onFailed = () => {

        } 

        RejectRequestController(jobId, onSuccess, onFailed)
    }

    const acceptRequest = (jobId: string) => {
        const onSuccess = () => {

        }

        const onFailed = () => {

        } 

        AcceptRequestController(jobId, onSuccess, onFailed)
    }

    const cardStyle = {
        border: "1px solid #e1e1e1",
        width: "200px",
        padding: "10px 35px",
        flex: "1 1 auto",
        cursor: "pointer"
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
            <div>Requests</div>

            {/*@ts-ignore*/}
            <div style={containerStyle}>
                {
                    /*@ts-ignore*/
                    requests?.length > 0 ?
                    requests?.map(({jobId, key, client: { firstname, lastname, email, phone }, vehicle: {brand, make, model, color, plateNumber}}) => (
                        <div key={key} style={cardStyle} >
                            <div>Customer</div>
                            <div>{firstname} {lastname}</div>
                            <div>{email}</div>
                            <div>{phone}</div>
                            <br />
                            <div>Vehicle</div>
                            <div>{brand}</div>
                            <div>{make}</div>
                            <div>{model}</div>
                            <div>{plateNumber}</div>
                            <div>{color}</div>

                            <div>
                                <span><button onClick={(e) => {acceptRequest(jobId)}}>Accept</button></span>
                                <span><button onClick={(e) => {rejectRequest(jobId)}}>Reject</button></span>
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