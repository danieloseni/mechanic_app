import React, { useCallback, useEffect, useState } from 'react'

interface Props {
    onButtonClick: () => void,
    onDetailsUpdated: (details: {service: string, address: {lat: number, lng: number}, date: string}) => void
}

const MaintenanceDetails = ({onDetailsUpdated, onButtonClick}: Props) => {
    const [service, updateService] = useState<string>("");
    const [address, updateAddress] = useState<{lat: number, lng: number}>({lat: 1, lng: 2});
    const [date, updateDate] = useState<string>("");

    const submit = () => {
        onDetailsUpdated({service, address, date})
        onButtonClick()
    }

    const getCurrentLocation = useCallback(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude: lat, longitude: lng}}) => {
            updateAddress({lat, lng})
        })
    }, [])

    useEffect(() => {
        getCurrentLocation()
    }, [getCurrentLocation])

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
                    </select>
                </div>
                <div className="fe-element">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" disabled placeholder='Your current location' />
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
