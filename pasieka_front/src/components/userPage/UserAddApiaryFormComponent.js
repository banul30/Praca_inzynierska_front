import React, {useState} from "react";
import {getNewAccessToken} from "../../utils/validationUtils";
import {postApiaryApiCall} from "../../api/apiaryCalls";
import {useNavigate} from "react-router-dom";
import {MapContainer, Marker, TileLayer, useMapEvents} from "react-leaflet";

const UserAddApiaryFormComponent = () =>{

    const [name, setName] = useState('');
    const [lat, setLat] = useState(52.237);
    const [lon, setLon] = useState(21.0);
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        let data = {
            nazwa: name,
            lat: lat,
            lon: lon
        }
        e.preventDefault();
        postApiaryApiCall(data).then((resp) => {
            if(resp.status >=200 && resp.status < 300){
                window.location.reload();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessToken(navigate).then((r) =>{
                    postApiaryApiCall(data).then((resp) => {
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

        setLat(52.237);
        setLon(21.0);
        setName('');
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
        <div className={'userAddApiaryForm'}>
            <h1>Tworzenie Pasieki</h1>
            <hr/>
            <h4>Ustaw Lokalizację</h4>
            <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarkers/>
            </MapContainer>
            {<form className={'loginForm'} onSubmit={handleSubmit}>
                <div className={'addApiary-form-grid'} style={{display:'inline-block', marginRight:'0'}}>
                    <label htmlFor="name">Nazwa: </label>
                    <input id="1" name="name" type="text" maxLength="50" value={name} required onChange={(e) => setName(e.target.value)}/>
                </div>
                <input  type="submit" className={'submitBtn'} value={'Utwórz'} style={{display:'inline-block', fontSize:'calc(8px + 0.9vh)'}}/>
            </form>}
        </div>
    );
};

export default UserAddApiaryFormComponent;