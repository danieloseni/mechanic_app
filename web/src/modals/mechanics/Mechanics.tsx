import React, { useCallback, useEffect, useState } from 'react'
import { getMechanics as GetMechanicsController } from 'controllers/mechanic-controller';
import { MechanicDetails } from 'interfaces/mechanic';
import MechanicTile from './MechanicTile';
type Props = {}

const Mechanics = (props: Props) => {
    const [mechanics, updateMechanics] = useState<MechanicDetails[]>([]);
    const [loading, updateLoadingStatus] = useState<boolean>(true);
    const containerStyle = {
      display: "flex",
      gap: "10px",
      "flex-wrap": "wrap"
    }
  
    const getMechanics = useCallback(() => {
  
      const onSuccess = (mechanics: MechanicDetails[]) => {
        updateMechanics(mechanics);
        updateLoadingStatus(false);
      }
  
      const onFailed = () => {
  
      }
  
      GetMechanicsController(onSuccess, onFailed)
  
    }, [])
  
    useEffect(() => {
        getMechanics()
    }, [getMechanics])
  
    return (
      loading ? 
      (<div>Loading... Please wait...</div>)
      :
      (<div style={containerStyle}>
        {
          mechanics.map(mechanic => (<MechanicTile {...mechanic} />))
        }
      </div>)
    )
}

export default Mechanics