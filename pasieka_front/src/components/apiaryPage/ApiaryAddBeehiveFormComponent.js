import React, {useState} from "react";
import {postBeehiveApiCall} from "../../api/beehiveCalls";
import {getNewAccessToken} from "../../utils/validationUtils";
import {useNavigate} from "react-router-dom";

const ApiaryAddBeehiveFormComponent = (props) =>{

    const id = props.id;
    const [name, setName] = useState('');
    const [aggression, setAggression] = useState('');
    const [body, setBody] = useState('');
    const [frame, setFrame] = useState('');
    const [race, setRace] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        let data = {
            nazwa: name,
            poziomAgresji: aggression,
            rodzajKorpusu: body,
            rodzajRamek: frame,
            pasiekaId: id,
            rasa: race
        }
        e.preventDefault();
        postBeehiveApiCall(data).then((resp) => {
            if(resp.status >=200 && resp.status < 300){
                window.location.reload();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessToken(navigate).then((r) =>{
                    postBeehiveApiCall(data).then((resp) => {
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

        setName('');
        setAggression('');
        setBody('');
        setFrame('');
        setRace('');
    };

    return(
        <div className={'apiaryAddBeehiveForm'}>
            <h1>Tworzenie Ula</h1>
            <hr/>
            {<form className={'loginForm'} onSubmit={handleSubmit}>
                <div className={'addApiary-form-grid'}>
                    <label htmlFor="name">Nazwa: </label>
                    <input id="1" name="name" type="text" maxLength="50" value={name} required onChange={(e) => setName(e.target.value)}/>

                    <label htmlFor="aggression">Agresja: </label>
                    <input id="2" name="aggression" type="text" maxLength="30" value={aggression} required onChange={(e) => setAggression(e.target.value)}/>

                    <label htmlFor="body">Korpus: </label>
                    <input id="3" name="body" type="text" maxLength="50" value={body} required onChange={(e) => setBody(e.target.value)}/>

                    <label htmlFor="frame">Ramki: </label>
                    <input id="4" name="frame" type="text" maxLength="50" value={frame} required onChange={(e) => setFrame(e.target.value)}/>

                    <label htmlFor="race">Rasa: </label>
                    <input id="5" name="race" type="text" maxLength="50" value={race} required onChange={(e) => setRace(e.target.value)}/>
                </div>
                <input  type="submit" className={'submitBtn'} value={'Utwórz'}/>
            </form>}
        </div>
    );
};

export default ApiaryAddBeehiveFormComponent;