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
          navigate("/send-request")
      }
      const onFailed = () => {}
      createJob(vehicleId, onSuccess, onFailed);
  }

  useEffect(() => {
      getVehicles()
  }, [getVehicles])

  return (
    loading ? 
    (<div className="main-pd">Loading... Please wait...</div>)
    :
    //@ts-ignore
    (<div className='blurred-modal'>
      <div className="header">
        <div className="close-button" onClick={(e) => {navigate(-1)}}>
              X
            </div>
      </div>

      <div className="modal-padded-box vehicle-popup">
          <div className="title">
              Select Vehicle

              <div className="cta-button" onClick={(e) => {navigate("/add-vehicle")}}>
                + New
                </div>
          </div>

          {
            vehicles.length > 0?
        vehicles.map(vehicle => (<VehicleTile key={vehicle.id} addJob={addJob} {...vehicle} />))

        : 

        <div className="action-box">
            <span>You do not have any vehicles saved. Add a new vehicle now</span>
            
        </div>
        
        
      }

          


      </div>
     
    </div>)
  )
}

export default Vehicles