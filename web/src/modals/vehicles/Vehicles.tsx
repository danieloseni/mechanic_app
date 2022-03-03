import { VehicleDetails } from 'interfaces/vehicle'
import React, {useEffect, useState, useCallback} from 'react';
import { getVehicles as GetVehicleController } from 'controllers/vehicle-controller';
import VehicleTile from './VehicleTile';
import { createJob } from 'controllers/job-controller';
import {useNavigate} from 'react-router-dom';

interface Props  {}

const Vehicles = (props: Props) => {
  const [vehicles, updateVehicles] = useState<VehicleDetails[]>([]);
  const [loading, updateLoadingStatus] = useState<boolean>(true);
  const navigate = useNavigate();

  const containerStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    
  }

  const getVehicles = useCallback(() => {
    updateLoadingStatus(true)
    const onSuccess = (vehicles: VehicleDetails[]) => {
      updateVehicles(vehicles);
      updateLoadingStatus(false);
    }

    const onFailed = () => {

    }

    GetVehicleController(onSuccess, onFailed)

  }, [])

  const addJob = (vehicleId: string) => {
      const onSuccess = (jobId:string) => {
          navigate("/")
      }
      const onFailed = () => {}
      createJob(vehicleId, onSuccess, onFailed);
  }

  useEffect(() => {
      getVehicles()
  }, [getVehicles])

  return (
    loading ? 
    (<div>Loading... Please wait...</div>)
    :
    //@ts-ignore
    (<div style={containerStyle}>
      {
        vehicles.map(vehicle => (<VehicleTile key={vehicle.id} addJob={addJob} {...vehicle} />))
      }
    </div>)
  )
}

export default Vehicles