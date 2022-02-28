import { VehicleDetails } from 'interfaces/vehicle';
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { addVehicle, getVehicles } from 'redux/actions/vehicleActions';

interface Props{
    addCar?: (details: VehicleDetails, onSuccess?: () => void, onFailed?: () => void) => void,
    vehicles?: VehicleDetails[],
    getCars?: () => void
}

const AddCar = ({addCar, vehicles, getCars}: Props) => {

    const [brand, updateBrand] = useState<string>("");
    const [make, updateMake] = useState<string>("");
    const [model, updateModel] = useState<string>("");
    const [plateNumber, updatePlateNumber] = useState<string>("");
    const [color, updateColor] = useState<string>("");

      useEffect(() => {
            getCars?.()
      }, [getCars])
    
      const onChange = (e: ChangeEvent<HTMLInputElement>) => {
            switch(e.target.name){
                case "brand":
                    updateBrand(e.target.value);
                    break;
                case "make":
                    updateMake(e.target.value);
                    break;
                case "model":
                    updateModel(e.target.value);
                    break;
                case "plateNumber":
                    updatePlateNumber(e.target.value);
                    break;
                case "color":
                    updateColor(e.target.value);
                    break;
                
            }
      }
    
      const onSubmit = (e: FormEvent<HTMLFormElement>) => {

            const onSuccess = () => {
                alert("Done")
            }

            const onFailed = () => {

            }
            
          e.preventDefault();
            addCar?.({
               brand, make, model, plateNumber, color 
            }, onSuccess, onFailed)
      }
    
      return (
        <>
        <div>Add Car</div>
            <div>
            {
                vehicles?.map(vehicle => vehicle?.brand)
            }
           <form onSubmit={onSubmit}>
               <div>Brand</div>
               <input type="text" name="brand" value={brand} onChange={onChange} />
   
               <br />
               <div>Make</div>
               <input type="text" name="make" value={make} onChange={onChange} />
   
               <br />
               <div>Model</div>
               <input type="text" name="model" value={model} onChange={onChange} />
   
               <br />
               <div>Plate Number</div>
               <input type="text" name="plateNumber" value={plateNumber} onChange={onChange} />
   
               <br />
               <div>Color</div>
               <input type="text" name="color" value={color} onChange={onChange} />
   
               <br />
               <button>Done</button>
           </form>
       </div>
        </>
        )

}

const mapStateToProps = (state:any) => ({
    vehicles: state.vehicles
})

const mapDispatchToProps = (dispatch:any) => ({
    addCar: (details: VehicleDetails, onSuccess?: () => void, onFailed?: () => void) => {dispatch(addVehicle(details, onSuccess, onFailed))},
    getCars: () => {dispatch(getVehicles())}
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCar)