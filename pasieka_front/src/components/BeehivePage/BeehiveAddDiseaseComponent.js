import React, {useState} from "react";
import {postDiseaseApiCall} from "../../api/diseaseCalls";
import {useNavigate} from "react-router-dom";
import {getNewAccessToken} from "../../utils/validationUtils";

const BeehiveAddDiseaseComponent = (props) =>{

    const setShowDiseaseAddForm = props.setShowDiseaseAddForm;
    const [diseases] = useState(props.diseases);
    const [beehiveId] = useState(props.beehiveId);
    const [disease, setDisease] = useState(props.diseases[0].chorobaId);
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        postDiseaseApiCall(beehiveId,disease).then((resp) => {
            if(resp.status >=200 && resp.status < 300){
                window.location.reload();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessToken(navigate).then((r) =>{
                    postDiseaseApiCall(beehiveId,disease).then((resp) => {
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

    const handleChange = (e) =>{
        setDisease(e.target.value);
    }

    return(
      <div className={'beehiveDiseases'}>
          <h1>Dodawanie Choroby</h1>
          {<form className={'loginForm'} onSubmit={handleSubmit}>
              <div className={'addDisease-form-grid'}>
                  <label htmlFor="disease">Choroba: </label>
                  <select id="disease" name="disease" defaultValue={disease} required onChange={handleChange}>
                      {diseases.map(disease => (
                          <option key={disease.chorobaId} value={disease.chorobaId}>{disease.nazwa} </option>
                      ))}
                  </select>
              </div>
              <input  type="submit" className={'submitBtn'} value={'Dodaj'}/>
              <button className={'apiarySelectButton'} onClick={() => setShowDiseaseAddForm(false)}>Anuluj</button>
          </form>}

      </div>
    );
};

export default BeehiveAddDiseaseComponent;