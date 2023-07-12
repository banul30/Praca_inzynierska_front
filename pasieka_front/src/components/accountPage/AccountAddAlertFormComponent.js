import React, {useState} from "react";
import {MapContainer, Marker, TileLayer, useMapEvents} from "react-leaflet";
import {putApiaryApiCall} from "../../api/apiaryCalls";
import {getNewAccessToken} from "../../utils/validationUtils";
import {useNavigate} from "react-router-dom";
import {postDiseaseAlert, postDiseaseAlertApiCall} from "../../api/userCalls";

const AccountAddAlertFormComponent = (props) =>{

    const setShowAlertForm = props.setShowAlertForm;
    const [lat, setLat] = useState(52.237);
    const [lon, setLon] = useState(21.0);
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        let data = {
            lat: lat,
            lon: lon
        }
        e.preventDefault();
        postDiseaseAlertApiCall(data).then((resp) => {
            if(resp.status >=200 && resp.status < 300){
                window.location.reload();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessToken(navigate).then((r) =>{
                    postDiseaseAlertApiCall(data).then((resp) => {
                        if(resp.status >=200 && resp.status < 300){
                            window.location.reload();
                        }else{
                            navigate('/error/'+resp.status);
                        }
                    });
                });
            }else{
                navigate('/error/'+resp.status);
            }
        }).catch((reason => console.log(reason)));
    }

    function LocationMarkers() {
        const map = useMapEvents({
            click(e) {
                setLat(e.latlng.lat);
                setLon(e.latlng.lng);
            }});
        return (
            <React.Fragment>
                <Marker position={[lat, lon]}>
                </Marker>
            </React.Fragment>
        );
    }

    return(
        <div className={'beehiveDetails'} style={{left:'22.5vw',top:'calc(30px + 13vh)'}}>
            <h1>Powiadamianie o zgnilcu</h1>
            <br/>
            <h4>Ustaw Lokalizację</h4>
            <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarkers/>
            </MapContainer>
            <br/>
            {<form className={'loginForm'} onSubmit={handleSubmit}>
                <input  type="submit" className={'submitBtn'}  value={'Poinformuj'}/>
                <button className={'apiarySelectButton'} onClick={() => setShowAlertForm(false)}>Anuluj</button>
            </form>}

        </div>
    );

};

export default AccountAddAlertFormComponent;