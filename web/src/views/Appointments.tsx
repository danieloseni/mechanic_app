import AppointmentCard from 'components/appointment-card/AppointmentCard';
import { Job } from 'interfaces/job';
import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux';
//@ts-ignore
import {cloneDeep} from 'loadash';
import { UserInfo } from 'interfaces/authentication';

interface Props{
    user?: UserInfo
}

interface CustomJob extends Job {
    loading?: boolean
}

const Appointments = ({user}: Props) => {
    const [jobs, updateJobs] = useState<CustomJob[]>([]);

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

       // GetJobsController(onSuccess, onFailed);

    }, [])

    const onMarkDone = (jobId: string) => {

        updateJobs(jobs => cloneDeep(
            jobs.map(job => {
                if (job._id === jobId) {
                    job.loading = true
                }
                return job
            })
        ))

        const onSuccess = () => {
            updateJobs(jobs => cloneDeep(
                jobs.map(job => {
                    if (job._id === jobId) {
                        job = {
                            ...job,
                            loading: false,
                            done: true
                        }
                    }
                    return job
                })
            ))
        }

        const onFailed = () => {
            updateJobs(jobs => cloneDeep(
                jobs.map(job => {
                    if (job._id === jobId) {
                        job = {
                            ...job,
                            loading: false,
                        }
                    }
                    return job
                })
            ))
        }

       // MarkDoneController(jobId, onSuccess, onFailed);
    }
    const onMarkMet = (jobId: string) => {
        updateJobs(cloneDeep(
            jobs.map(job => {
                if (job._id === jobId) {
                    job.loading = true
                }
                return job
            })
        ))
        const onSuccess = () => {
            updateJobs(cloneDeep(
                jobs.map(job => {
                    if (job._id === jobId) {
                        job = {
                            ...job,
                            loading: false,
                            done: true
                        }
                    }
                    return job
                })
            ))
        }
        const onFailed = () => {
            updateJobs(cloneDeep(
                jobs.map(job => {
                    if (job._id === jobId) {
                        job = {
                            ...job,
                            loading: false,
                        }
                    }
                    return job
                })
            ))
        }

        // MarkMetController(jobId, onSuccess, onFailed);
    }


    const containerStyle = {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",

    }

    useEffect(() => {
        getJobs();
    }, [getJobs])



    return (
        <>
            <div className='title'>Jobs</div>
            {/*@ts-ignore*/}
            <div style={containerStyle}>
                {
                    jobs.map(({ assignedMechanic: { firstname, lastname, email, phone } = {}, assignedMechanic, dateAssigned, dateCreated, vehicleId: { brand, make, model, plateNumber, color }, userId: { firstname: customerFirstname, lastname: customerLastname, email: customerEmail, phone: customerPhone }, done, met, _id:id }) => (

                        <AppointmentCard key={id} {...{ color, brand, make, model, firstname, lastname, email, phone, role: user!?.role, mechanicAssigned: (() => assignedMechanic && true)(), plateNumber, dateCreated, dateAssigned, customerFirstname, customerLastname, customerEmail, customerPhone, done, met, id, onMarkDone, onMarkMet }} />

                    ))
                }
            </div>

        </>
    )
}
const mapStateToProps = (state: any) => ({
    user: state.user
})
export default connect(mapStateToProps, null)(Appointments)