import React, {useState} from "react";
import {postFoodApiCall} from "../../api/apiaryCalls";
import {useNavigate} from "react-router-dom";
import {getNewAccessToken} from "../../utils/validationUtils";

const ApiaryAddFoodFormComponent = (props) =>{

    const [id] = useState(props.apiaryId);
    const setShowFoodForm = props.setShowFoodForm;
    const [food, setFood] = useState('');
    const [weight, setWeight] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        let data = {
            rodzaj: food,
            masa: weight,
            pasiekaId: id
        }
        e.preventDefault();
        postFoodApiCall(data).then((resp) => {
            if(resp.status >=200 && resp.status < 300){
                window.location.reload();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessToken(navigate).then((r) =>{
                    postFoodApiCall(data).then((resp) => {
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
        <div className={'apiaryEditForm'} style={{height: '40vh'}}>
            <h1>Dodawanie pokarmu</h1>
            <br/>
            {<form className={'loginForm'} onSubmit={handleSubmit}>
                <div className={'addApiary-form-grid'}>
                    <label htmlFor="food">Pokarm: </label>
                    <input id="1" name="food" type="text" maxLength="50" value={food} required onChange={(e) => setFood(e.target.value)}/>

                    <label htmlFor="weight">Masa: </label>
                    <input id="1" name="weight" type="number" min="1" max="1000000" step="1" value={weight} required onChange={(e) => setWeight(e.target.value)}/>
                </div>
                <input  type="submit" className={'submitBtn'} value={'Zapisz'}/>
                <button className={'apiarySelectButton'} onClick={() => setShowFoodForm(false)}>Anuluj</button>
            </form>}

        </div>
    );
};

export default ApiaryAddFoodFormComponent;