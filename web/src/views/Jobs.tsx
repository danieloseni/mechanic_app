import { Job } from 'interfaces/job';
import React, { useState, useEffect, useCallback } from 'react'
import { getJobs as GetJobsController } from 'controllers/job-controller';
//@ts-ignore
import {cloneDeep} from 'lodash'
type Props = {}

const Jobs = (props: Props) => {
    const [jobs, updateJobs] = useState<Job[]>([]);

    const getJobs = useCallback(() => {

        const onSuccess = (jobsList: Job[]) => {
            // jobsList = jobsList.map(job => {
            //     return job;
            // })

           updateJobs(jobsList)
            //updateJobs(cloneDeep(jobsList));
        }

        const onFailed = () => {

        }

        GetJobsController(onSuccess, onFailed);

    }, [])

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
        getJobs();
    }, [getJobs])

    console.log(jobs[0])
    

    return (
        <>
            <h1>Jobs</h1>
            <h4>Pending</h4>
            {/*@ts-ignore */}
            <div style={containerStyle}>
            
                {
                    jobs.map(
                        ({ assignedMechanic, dateCreated, vehicleId: { brand, make, model, color, plateNumber } }) => //!assignedMechanic &&
                        (

                            <div style={cardStyle} >
                                <div>Vehicle</div>
                                <div>
                                    {color} {brand} {make} {model} model - {plateNumber}
                                </div>

                                <div>{new Date(dateCreated).getDate()}/{new Date(dateCreated).getMonth() + 1}/{new Date(dateCreated).getFullYear()}</div>
                            </div>
                        )


                    )
                }
            </div>

            <h4>Assigned</h4>
            {
                jobs.map(({ assignedMechanic: mechanic, dateCreated, vehicleId: { brand, make, model, color, plateNumber } }) => //mechanic &&
                    (

                        <div style={cardStyle} >
                            <div>Vehicle</div>
                            <div>
                                {color} {brand} {make} {model} model - {plateNumber}
                            </div>
                            <br />
                            <div>Mechanic</div>
                            {(() => {
                                const {firstname, lastname, email, phone} = mechanic
                                return (
                                    <>
                                        <div>{firstname} {lastname}</div>
                                        <div>{phone}</div>
                                        <div>{email}</div>
                                        
                                    </>)
                            })}




                            <div>{new Date(dateCreated).getDate()}/{new Date(dateCreated).getMonth() + 1}/{new Date(dateCreated).getFullYear()}</div>
                        </div>
                    )

                )

            }
        </>
    )
}

export default Jobs