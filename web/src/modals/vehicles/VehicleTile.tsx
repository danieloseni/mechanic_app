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

  
    return (
        <>
            <div className='vehicle-card' onClick={(e) => {
                if(id)
                    addJob(id)
            }}>
                
                <div className='heading'>{brand} - {make}</div>
                
                <div className='details'>{model} Model ({plateNumber})</div>
                
                <div className='color'>{color}</div>

            </div>

            
        </>
    )
}

export default VehicleTile