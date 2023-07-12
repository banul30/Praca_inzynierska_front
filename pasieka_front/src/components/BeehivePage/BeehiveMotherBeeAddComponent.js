import React, {useState} from "react";
import {postMotherBeeApiCall} from "../../api/motherBeeApiCalls";
import {useNavigate} from "react-router-dom";
import {getNewAccessToken} from "../../utils/validationUtils";

const BeehiveMotherBeeAddComponent = (props) =>{

    const [date, setDate] = useState('');
    const [source, setSource] = useState('');
    const [beehiveId] = useState(props.beehiveId);
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
        postMotherBeeApiCall(beehiveId, data).then((resp) => {
            if(resp.status >=200 && resp.status < 300){
                window.location.reload();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessToken(navigate).then((r) =>{
                    postMotherBeeApiCall(beehiveId, data).then((resp) => {
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

        setSource('');
        setDate('');
    };


    return(
        <React.Fragment>
            <h1>Dodawanie Matki</h1>
            <hr/>
            <br/>
            {<form className={'loginForm'} onSubmit={handleSubmit}>
                <div className={'addMotherBee-form-grid'}>
                    <label htmlFor="date">Data wprowadzenia: </label>
                    <input id="1" name="date" type="date" value={date} required onChange={(e) => setDate(e.target.value)}/>

                    <label htmlFor="source">Pozyskanie: </label>
                    <input id="2" name="source" type="text" maxLength="40" value={source} required onChange={(e) => setSource(e.target.value)}/>

                </div>
                <input  type="submit" className={'submitBtn'} value={'Utwórz'}/>
                <button className={'apiarySelectButton'} onClick={setShowDetails}>Anuluj</button>
            </form>}
        </React.Fragment>
    );
}

export default BeehiveMotherBeeAddComponent;