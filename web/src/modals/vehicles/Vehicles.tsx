import { VehicleDetails } from 'interfaces/vehicle'
import React, {useEffect, useState, useCallback} from 'react';
import { getVehicles as GetVehicleController } from 'controllers/vehicle-controller';
import VehicleTile from './VehicleTile';

interface Props  {}

const Vehicles = (props: Props) => {
  const [vehicles, updateVehicles] = useState<VehicleDetails[]>([]);
  const [loading, updateLoadingStatus] = useState<boolean>(true);
  const containerStyle = {
    display: "flex",
    gap: "10px",
    "flex-wrap": "wrap"
  }

  const getVehicles = useCallback(() => {

    const onSuccess = (vehicles: VehicleDetails[]) => {
      updateVehicles(vehicles);
      updateLoadingStatus(false);
    }

    const onFailed = () => {

    }

    GetVehicleController(onSuccess, onFailed)

  }, [])

  useEffect(() => {
      getVehicles()
  }, [getVehicles])

  return (
    loading ? 
    (<div>Loading... Please wait...</div>)
    :
    (<div style={containerStyle}>
      {
        vehicles.map(vehicle => (<VehicleTile {...vehicle} />))
      }
    </div>)
  )
}

export default Vehicles