import React, {useEffect, useState} from "react";
import {getAvilableProducersApiCall, postWeightApiCall} from "../../api/weightApiCalls";
import {useNavigate} from "react-router-dom";
import {
    CheckTokensExistence, getCsrfToken,
    getNewAccessToken, getNewAccessTokenAndReload,
} from "../../utils/validationUtils";


const BeehiveWeightAddComponent = (props) =>{
    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');
    const [apiID, setApiID] = useState('');
    const [producers, setProducers] = useState([]);
    const [beehiveId] = useState(props.beehiveId);
    const setShowEditForm = props.setShowEditForm;
    const setShowAddForm = props.setShowAddForm;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const setShowDetails = ()=>{
        setShowEditForm(false);
        setShowAddForm(false);
    }

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
            setManufacturer(data[0]);
        });

    }, [navigate]);

    const handleSubmit = (e) =>{
        setLoading(true);
        let data = {
            producent: manufacturer,
            model: model,
            apiID: apiID
        };
        e.preventDefault();
        postWeightApiCall(beehiveId, data).then((resp) => {
            if(resp.status >=200 && resp.status < 300){
                setLoading(false);
                window.location.reload();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessToken(navigate).then((r) =>{
                    postWeightApiCall(beehiveId, data).then((resp) => {
                        if(resp.status >=200 && resp.status < 300){
                            setLoading(false);
                            window.location.reload();
                        }else if(resp.status === 400){
                            setLoading(false);
                            window.alert('Podano niepoprawne API ID');
                            window.location.reload();
                        }else{
                            navigate('/error/'+resp.status);
                        }
                    });
                });
            }else if(resp.status === 400){
                setLoading(false);
                window.alert('Podano niepoprawne API ID');
                window.location.reload();
            }else{
                navigate('/error/'+resp.status);
            }
        }).catch((reason => console.log(reason)));
        setManufacturer('');
        setModel('');
        setApiID('');
    };

    const handleChange = (e) =>{
        setManufacturer(e.target.value);
    }

    return(
        <React.Fragment>
            <h1>Dodawanie Wagi</h1>
            <hr/>
            <br/>
            {(()=>{
                if(loading){
                    return(
                        <React.Fragment>
                            <img src={'/img/flyingBee2.gif'} alt={'flying bee'} className={'weightLoading'}/>
                            <h2>Loading...</h2>
                        </React.Fragment>

                    );
                }else{
                    return(
                        <form className={'loginForm'} onSubmit={handleSubmit}>
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
                            <input  type="submit" className={'submitBtn'} value={'Utwórz'}/>
                            <button className={'apiarySelectButton'} onClick={setShowDetails}>Anuluj</button>
                        </form>
                    );
                }
            })()}
        </React.Fragment>
    );
};

export default BeehiveWeightAddComponent;