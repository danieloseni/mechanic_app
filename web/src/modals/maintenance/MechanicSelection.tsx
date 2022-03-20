import { MechanicDetails } from 'interfaces/mechanic'
import React from 'react'
import { connect } from 'react-redux'

interface Props {
    onButtonClick: () => void
    onMechanicSelected: (details: MechanicDetails) => void,
    mechanics?: MechanicDetails[]
}

const MechanicSelection = ({ mechanics, onMechanicSelected, onButtonClick }: Props) => {

    const onClick = (mechanic: MechanicDetails) => {
        onMechanicSelected(mechanic);
        onButtonClick()
    }

    return (
        <div className="mechanic-section modal-padded-box">
            <div className="title">
                Select Mechanic
            </div>

            {
                mechanics?.map?.((mechanic) => {
                    const { firstname, lastname, email, phone } = mechanic
                    return <div className="mechanic-selection-tile " onClick = {(e) => {onClick(mechanic)}}>
                        <div className="details">
                            <div className="detail">
                                <div className="icon"><i className="fal fa-user"></i></div>
                                <div className="info">{firstname} {lastname}</div>
                            </div>
                            <div className="detail">
                                <div className="icon"><i className="fal fa-phone"></i></div>
                                <div className="info">{phone}</div>
                            </div>
                            <div className="detail">
                                <div className="icon"><i className="fal fa-envelope"></i></div>
                                <div className="info">{email}</div>
                            </div>
                        </div>

                        <div className="select-indicator ">
                            <div className="icon"><i className="fal fa-check"></i></div>
                        </div>

                    </div>
                })
            }

            {/*             
            {mechanics!?.length > 0 && <div className="fe-group">
                <div className="form-button-box"><button className="cta">Done</button></div>

            </div>} */}
        </div>
    )
}
const mapStateToProps = (state: any) => ({
    mechanics: state.mechanics
})
export default connect(mapStateToProps, null)(MechanicSelection)
