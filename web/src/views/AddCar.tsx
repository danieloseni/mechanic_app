import { VehicleDetails } from 'interfaces/vehicle';
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { addVehicle, getVehicles } from 'redux/actions/vehicleActions';
import {useNavigate} from 'react-router-dom';

interface Props {
    addCar?: (details: VehicleDetails, onSuccess?: () => void, onFailed?: () => void) => void,
    vehicles?: VehicleDetails[],
    getCars?: () => void
}

const AddCar = ({ addCar, vehicles, getCars }: Props) => {
    const navigation = useNavigate();

    const [brand, updateBrand] = useState<string>("");
    const [make, updateMake] = useState<string>("");
    const [model, updateModel] = useState<string>("");
    const [plateNumber, updatePlateNumber] = useState<string>("");
    const [color, updateColor] = useState<string>("");

    useEffect(() => {
        getCars?.()
    }, [getCars])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
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
            navigation(-1)
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
            <div className='blurred-modal'>
                <div className="header">

                    <div className="close-button" onClick={(e) => {navigation(-1)}}>
                        X
                    </div>
                </div>
                <div className="modal-padded-box">
                    <div className='title'>
                        Add New Vehicle
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="fe-group">

                            <div className="fe-element">
                                <div>Brand</div>
                                <input type="text" name="brand" value={brand} onChange={onChange} />
                            </div>

                            <div className="fe-element">
                                <div>Make</div>
                                <input type="text" name="make" value={make} onChange={onChange} />
                            </div>

                            <div className="fe-element">
                                <div>Model</div>
                                <input type="text" name="model" value={model} onChange={onChange} />
                            </div>

                            <div className="fe-element">
                                <div>Plate Number</div>
                                <input type="text" name="plateNumber" value={plateNumber} onChange={onChange} />
                            </div>

                            <div className="fe-element">
                                <div>Color</div>
                                <input type="text" name="color" value={color} onChange={onChange} />
                            </div>

                            <div className="form-submit-button">
                                <button className='cta'>Save</button>

                            </div>

                        </div>

                    </form>
                </div>

            </div>
        </>
    )

}

const mapStateToProps = (state: any) => ({
    vehicles: state.vehicles
})

const mapDispatchToProps = (dispatch: any) => ({
    addCar: (details: VehicleDetails, onSuccess?: () => void, onFailed?: () => void) => { dispatch(addVehicle(details, onSuccess, onFailed)) },
    getCars: () => { dispatch(getVehicles()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCar)