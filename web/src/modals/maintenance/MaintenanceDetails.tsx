import React, { useCallback, useEffect, useState } from 'react'

interface Props {
    onButtonClick: () => void,
    onDetailsUpdated: (details: {service: string, address: string, date: string}) => void
}

const MaintenanceDetails = ({onDetailsUpdated, onButtonClick}: Props) => {
    const [service, updateService] = useState<string>("");
    const [address, updateAddress] = useState<string>("");
    const [date, updateDate] = useState<string>("");

    const submit = () => {
        onDetailsUpdated({service, address, date})
        onButtonClick()
    }

   
    return (
        <div className="mechanic-section modal-padded-box">
            <div className="title">
                Schedule Maintenance
            </div>

            <div className="fe-group">
                <div className="fe-element">
                    <label htmlFor="service">Service</label>
                    <select name="" id="service" value={service} onChange={e => {updateService(e.target.value)}}>
                        <option value="">Select Service</option>
                        <option value="battery_checking">Battery Checking</option>
                        <option value="tyre_check_replacement">Tyre check and/or replacement </option>
                        <option value="engine_checkup">Engine checkup </option>
                    </select>
                </div>
                <div className="fe-element">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address"  placeholder='Your address' onChange={e => {updateAddress(e.target.value)}} />
                </div>
                <div className="fe-element">
                    <label htmlFor="date">Select Date</label>
                    <input type="date" id="date" value={date} onChange={e => {updateDate(e.target.value)}}  />
                </div>
                <div className="form-button-box"><button className="cta" onClick={e => {submit()}}>Find Mechanic</button></div>

            </div>
        </div>
    )
}

export default MaintenanceDetails
