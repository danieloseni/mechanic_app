import React from 'react'

interface Props {
    color: string,
    brand: string,
    make: string,
    model: string,
    plateNumber: string,
    mechanicAssigned: boolean,

    firstname?: string,
    lastname?: string,
    email?: string,
    phone?: string,

    customerFirstname: string,
    customerLastname: string,
    customerEmail: string,
    customerPhone: string

    dateCreated: string
    done: boolean,
    met: boolean
    role: string,
    onMarkDone: (jobId: string) => void
    onMarkMet: (jobId: string) => void
    loading?: boolean,
    id: string
}



const JobCard = ({ firstname, lastname, phone, email, make, model, plateNumber, brand, color, dateCreated, mechanicAssigned, role, customerFirstname, customerLastname, customerEmail, customerPhone, met, done, onMarkDone, onMarkMet, loading, id }: Props) => {

    const getStatusAndColorClass = () => {
        let status: string = "";
        let colorClass: string = ""
        if (!mechanicAssigned) {
            status = "waiting to get a mechanic"
            colorClass = "alert"
        } else {
            if (!met) {
                status = "waiting to meet"
                colorClass = "mid"
            } else if (met && !done) {
                status = "work in progress"
                colorClass = "cel"
            } else if (done) {
                colorClass = "success"
                status = "done"
            }
        }

        return { status, colorClass };
    }

    return (

        <div className="modal-padded-box job-card ">
            <div className="heading">
                <div className={"job-status " + (getStatusAndColorClass().colorClass)}>
                    {
                        getStatusAndColorClass().status
                    }

                </div>
            </div>


            {role === "mechanic" && <>

                <div className="small-title">
                    Customer information
                </div>

                <div className="detail-box">
                    <div className="detail">
                        <div className="icon"><i className="fal fa-user"></i></div>
                        {customerFirstname} {customerLastname}

                    </div>
                    <div className="detail">
                        <div className="icon"><i className="fal fa-phone"></i></div>
                        {customerPhone}

                    </div>
                    <div className="detail">
                        <div className="icon"><i className="fal fa-envelope"></i></div>
                        {customerPhone}

                    </div>

                </div>
            </>
            }

            <div className="detail">
                <div className="icon"><i className="fal fa-car"></i></div>

                {color} {brand} {make} {model} model - {plateNumber}
            </div>


            {(role === "client" && mechanicAssigned) && <>

                <div className="small-title">
                    Mechanic's information
                </div>

                <div className="detail-box">
                    <div className="detail">
                        <div className="icon"><i className="fal fa-user"></i></div>
                        {firstname} {lastname}

                    </div>
                    <div className="detail">
                        <div className="icon"><i className="fal fa-phone"></i></div>
                        {phone}

                    </div>
                    <div className="detail">
                        <div className="icon"><i className="fal fa-envelope"></i></div>
                        {email}

                    </div>

                    <div className="detail">
                        <div className="icon"><i className="fal fa-car"></i></div>

                        {color} {brand} {make} {model} model - {plateNumber}
                    </div>
                </div>
            </>}


            <div className="date">
                {new Date(dateCreated).getDate()}/{new Date(dateCreated).getMonth() + 1}/{new Date(dateCreated).getFullYear()}
            </div>

            {(mechanicAssigned && role === "client") && <div className="title">Mechanic</div>}

            {(() => {

                return (
                    <>
                        <div>{firstname} {lastname}</div>
                        <div>{phone}</div>
                        <div>{email}</div>

                    </>)
            })}

            {(role === "mechanic" && !done) &&
                <>
                    {
                        (() => {
                            if (!met) {
                                return (<div className="form-button-box"><button className="cta" onClick = {e => onMarkMet(id)} title={"I have met with the client"}>
                                    {loading ? "Hold on..." :
                                        <i className="fas fa-handshake"></i>

                                    }
                                </button></div>)

                            } else if (!done) {
                                return (<div className="form-button-box"><button className="cta" onClick = {e => onMarkDone(id)}
                                 title={"Mark job as done"}>
                                    {loading ? "Hold on..." : <i className="fas fa-check"></i>

                                    }
                                </button></div>)
                            }
                        })()


                    }

                </>
            }

        </div>


    )
}


export default JobCard
