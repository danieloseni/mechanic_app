import React from 'react'

interface Props {
    brand: string,
    model: string,
    make: string,
    color: string,
    plateNumber: string,
    id?: string
    addJob: (vehicleId: string) => void
}

const VehicleTile = ({ brand, model, make, color, plateNumber, id, addJob }: Props) => {

    const cardStyle = {
        border: "1px solid #e1e1e1",
        width: "200px",
        padding: "10px 35px",
        flex: "1 1 auto",
        cursor: "pointer"
    }
    return (
        <>
            <div style={cardStyle} onClick={(e) => {
                if(id)
                    addJob(id)
            }}>
                
                <div>{brand}</div>
                <div>{make}</div>
                <div>{model}</div>
                <div>{plateNumber}</div>
                <div>{color}</div>

            </div>

            
        </>
    )
}

export default VehicleTile