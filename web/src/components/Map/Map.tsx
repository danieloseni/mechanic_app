import React, { useEffect, useState } from 'react'
// import { Map as MapView, GoogleApiWrapper, Marker } from 'google-maps-react';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import { connect } from 'react-redux'
import { sendRequest as SendRequestController } from 'controllers/mechanic-controller';

//@ts-ignore

//AIzaSyB9CQiAzHM_ISxw6g2rLRn5hbSVpKih9a8
interface Props {
    google?: any,
    mechanics?: any[]
}

const Map = ({ mechanics }: Props) => {
    console.log(mechanics)
    const [currentLocation, updateCurrentLocation] = useState<{ lat: number, lng: number }>({ lat: 47.444, lng: -122.176 });
    const sendRequest = (mechanicId: string) => {

        const onSuccess = () => {
            console.log('success')
        }
        const onFailed = () => { }
        SendRequestController(mechanicId, onSuccess, onFailed);
    }

    const displayMarkers = () => {
        return mechanics?.map(({ latitude, longitude, email, phone, firstname, lastname, id }, index) => {
            return <Marker key={index}

                // id={index} 
                icon={{

                    url: 'https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/50/000000/external-hat-camping-vitaliy-gorbachev-flat-vitaly-gorbachev.png',

                    anchor: new google.maps.Point(17, 46),

                    scaledSize: new google.maps.Size(37, 37)


                }}

                labelAnchor={new google.maps.Point(0, 0)}

                position={{
                    lat: latitude,
                    lng: longitude
                }}

                onClick={(e) => {
                   
                    //@ts-ignore
                    if (!window.jobId || !window.vehicleId) {
                        window.location.href = "/vehicles"
                    } else {
                        
                        //@ts-ignore
                        window.showRequestPopup(firstname, lastname, email, phone, id, sendRequest
                        )
                    }

                }}
            >

                {/* <InfoWindow onCloseClick={() => { }}>

                    <div>
                        <div>{firstname} {lastname}</div>
                        <div>{email}</div>
                        <div>{phone}</div>
                        <button onClick={
                            (e) => {
                                //@ts-ignore
                                if(!window.jobId || !window.vehicleId){
                                    window.location.href="/vehicles"
                                }else{
                                    sendRequest(id)
                                }
                            }
                        }>Send Request</button>

                    </div>
                </InfoWindow> */}
            </Marker>
        })
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((data) => {
            updateCurrentLocation({ "lat": data.coords.latitude, "lng": data.coords.longitude })
        }, (error) => { }, { enableHighAccuracy: true })

    }, [])



    return (

        <>
            {/* <div className="body-overlay">
                
                <div className="cta rounded-cta">
                    Request a mechanic    
                </div>
            </div> */}
            <GoogleMap defaultZoom={18} center={currentLocation}>
                {displayMarkers()}
            </GoogleMap>
        </>
    )
}

// export default withGoogleMap({
//     apiKey: "AIzaSyB9CQiAzHM_ISxw6g2rLRn5hbSVpKih9a8"
// })(Map)

const mapStateToProps = (state: any) => ({
    mechanics: state.mechanics
})

export default connect(mapStateToProps, null)(withScriptjs(withGoogleMap(Map)));