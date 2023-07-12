import React, {useEffect, useState} from "react";
import {getAvilableProducersApiCall, putWeightApiCall} from "../../api/weightApiCalls";
import {useNavigate} from "react-router-dom";
import {
    CheckTokensExistence,
    getCsrfToken,
    getNewAccessToken,
    getNewAccessTokenAndReload
} from "../../utils/validationUtils";

const BeehiveWeightEditComponent = (props) =>{

    const [id] = useState(props.weight.wagaId)
    const [manufacturer, setManufacturer] = useState(props.weight.producent);
    const [model, setModel] = useState(props.weight.model);
    const [apiID, setApiID] = useState(props.weight.apiID);
    const [producers, setProducers] = useState([]);
    const setShowEditForm = props.setShowEditForm;
    const setShowAddForm = props.setShowAddForm;
    const navigate = useNavigate();

    useEffect( () => {
        CheckTokensExistence(navigate);
        getAvilableProducersApiCall().then(resp =>{
            if(resp.status >= 200 && resp.status < 300){
                return resp.json();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessTokenAndReload(navigate);
            }else {
                navigate('/error/'+resp.status);
            }
        }).then(data =>{
            setProducers(data);
            getCsrfToken();
        });

    }, [navigate]);

    const setShowDetails = ()=>{
        setShowEditForm(false);
        setShowAddForm(false);
    }

    const handleSubmit = (e) =>{
        let data = {
            producent: manufacturer,
            model: model,
            apiID: apiID
        }
        e.preventDefault();
        putWeightApiCall(id, data).then((resp) => {
            if(resp.status >=200 && resp.status < 300){
                window.location.reload();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessToken(navigate).then((r) =>{
                    putWeightApiCall(id, data).then((resp) => {
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

    const handleChange = (e) =>{
        setManufacturer(e.target.value);
    }

    return(
        <React.Fragment>
            <h1>Edycja Wagi</h1>
            <hr/>
            <br/>
            {<form className={'loginForm'} onSubmit={handleSubmit}>
                <div className={'addMotherBee-form-grid'}>
                    <label htmlFor="manufacturer">Producent: </label>
                    <select id="1" name="manufacturer" defaultValue={manufacturer} required onChange={handleChange}>
                        {producers.map(producer => (
                            <option key={producer} value={producer}>{producer}</option>
                        ))}
                    </select>

                    <label htmlFor="model">Model: </label>
                    <input id="2" name="model" type="text" maxLength="40" value={model} required onChange={(e) => setModel(e.target.value)}/>

                    <label htmlFor="apiID">Api ID: </label>
                    <input id="3" name="apiID" type="text" maxLength="160" value={apiID} required onChange={(e) => setApiID(e.target.value)}/>

                </div>
                <input  type="submit" className={'submitBtn'} value={'Zapisz'}/>
                <button className={'apiarySelectButton'} onClick={setShowDetails}>Anuluj</button>
            </form>}
        </React.Fragment>
    );
};

export default BeehiveWeightEditComponent;