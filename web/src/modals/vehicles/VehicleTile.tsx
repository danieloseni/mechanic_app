import React from 'react'

interface Props {
    brand: string,
    model: string,
    make: string,
    color: string,
    plateNumber: string
}

const VehicleTile = ({ brand, model, make, color, plateNumber }: Props) => {

    const cardStyle = {
        border: "1px solid #e1e1e1",
        width: "200px",
        padding: "10px 35px",
        flex: "1 1 auto",
        cursor: "pointer"
    }
    return (
        <>
            <div style={cardStyle}>
                <div>{brand}</div>
                <div>{make}</div>
                <div>{model}</div>
                <div>{plateNumber}</div>
                <div>{color}</div>
            </div>

            <div style={cardStyle}>
                <div>{brand}</div>
                <div>{make}</div>
                <div>{model}</div>
                <div>{plateNumber}</div>
                <div>{color}</div>
            </div>
            <div style={cardStyle}>
                <div>{brand}</div>
                <div>{make}</div>
                <div>{model}</div>
                <div>{plateNumber}</div>
                <div>{color}</div>
            </div>

            <div style={cardStyle}>
                <div>{brand}</div>
                <div>{make}</div>
                <div>{model}</div>
                <div>{plateNumber}</div>
                <div>{color}</div>
            </div>
            <div style={cardStyle}>
                <div>{brand}</div>
                <div>{make}</div>
                <div>{model}</div>
                <div>{plateNumber}</div>
                <div>{color}</div>
            </div>

            <div style={cardStyle}>
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