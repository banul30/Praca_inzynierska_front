import React, {useState} from "react";
import {putMotherBeeApiCall} from "../../api/motherBeeApiCalls";
import {useNavigate} from "react-router-dom";
import {getNewAccessToken} from "../../utils/validationUtils";

const BeehiveMotherBeeEditComponent = (props) =>{

    const [id] = useState(props.motherBee.matkaPszczelaId);
    const [date, setDate] = useState(props.motherBee.dataWprowadzenia);
    const [source, setSource] = useState(props.motherBee.rodzajPozyskania);
    const setShowEditForm = props.setShowEditForm;
    const setShowAddForm = props.setShowAddForm;
    const navigate = useNavigate();

    const setShowDetails = ()=>{
        setShowEditForm(false);
        setShowAddForm(false);
    }

    const handleSubmit = (e) =>{
        let data = {
            dataWprowadzenia: date,
            rodzajPozyskania: source
        }
        e.preventDefault();
        putMotherBeeApiCall(id, data).then((resp) => {
            if(resp.status >=200 && resp.status < 300){
                window.location.reload();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessToken(navigate).then((r) =>{
                    putMotherBeeApiCall(id, data).then((resp) => {
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


    return(
        <React.Fragment>
            <h1>Edycja Matki</h1>
            <hr/>
            <br/>
            {<form className={'loginForm'} onSubmit={handleSubmit}>
                <div className={'addMotherBee-form-grid'}>
                    <label htmlFor="date">Data wprowadzenia: </label>
                    <input id="1" name="date" type="date" value={date} required onChange={(e) => setDate(e.target.value)}/>

                    <label htmlFor="source">Pozyskanie: </label>
                    <input id="2" name="source" type="text" maxLength="40" value={source} required onChange={(e) => setSource(e.target.value)}/>

                </div>
                <input  type="submit" className={'submitBtn'} value={'Zapisz'}/>
                <button className={'apiarySelectButton'} onClick={setShowDetails}>Anuluj</button>
            </form>}
        </React.Fragment>
    );
};

export default BeehiveMotherBeeEditComponent;