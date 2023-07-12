import React, { useState} from "react";
import {putApiaryApiCall} from "../../api/apiaryCalls";
import {useNavigate} from "react-router-dom";
import {getNewAccessToken} from "../../utils/validationUtils";
import {MapContainer, Marker, TileLayer, useMapEvents} from "react-leaflet";

const ApiaryEditFormComponent = (props) =>{

    const [id] = useState(props.apiary.pasiekaId);
    const setShowEditForm = props.setShowEditForm;
    const [name, setName] = useState(props.apiary.nazwa);
    const [lat, setLat] = useState(props.apiary.lat);
    const [lon, setLon] = useState(props.apiary.lon);
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        let data = {
            nazwa: name,
            lat: lat,
            lon: lon
        }
        e.preventDefault();
        putApiaryApiCall(id, data).then((resp) => {
            if(resp.status >=200 && resp.status < 300){
                window.location.reload();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessToken(navigate).then((r) =>{
                    putApiaryApiCall(id, data).then((resp) => {
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

    };

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
        <div className={'apiaryEditForm'}>
            <h1>Edycja pasieki</h1>
            <h4>Ustaw Lokalizację</h4>
            <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarkers/>
            </MapContainer>
            {<form className={'loginForm'} onSubmit={handleSubmit}>
                <div className={'addApiary-form-grid'} >
                    <label htmlFor="name" >Nazwa: </label>
                    <input id="1" name="name" style={{marginBottom:'0.8vh'}} type="text" maxLength="50" value={name} required onChange={(e) => setName(e.target.value)}/>
                </div>
                <input  type="submit" className={'submitBtn'} value={'Zapisz'} style={{marginTop:'1px', padding:'0.8vh 0.8vw'}}/>
                <button className={'apiarySelectButton'} onClick={() => setShowEditForm(false)}>Anuluj</button>
            </form>}

        </div>
    );
};

export default ApiaryEditFormComponent;