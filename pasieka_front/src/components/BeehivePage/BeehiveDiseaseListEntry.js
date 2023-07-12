import React, {useState} from "react";
import {deleteDiseaseApiCall} from "../../api/diseaseCalls";
import {useNavigate} from "react-router-dom";
import {getNewAccessToken} from "../../utils/validationUtils";

const BeehiveDiseaseListEntry = (props) =>{

    const [disease] = useState(props.disease);
    const [beehiveId] = useState(props.beehiveId);
    const navigate = useNavigate();

    const deleteDisease = () =>{
        if(window.confirm('Czy na pewno chcesz usunąć chorobę?')){
            deleteDiseaseApiCall(beehiveId, disease.chorobaId).then((resp) => {
                if(resp.status >=200 && resp.status < 300){
                    window.location.reload();
                    window.alert('Chorobę usunięto pomyślnie');
                }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                    getNewAccessToken(navigate).then((r) =>{
                        deleteDiseaseApiCall(beehiveId, disease.chorobaId).then((resp) => {
                            if(resp.status >=200 && resp.status < 300){
                                window.location.reload();
                                window.alert('Chorobę usunięto pomyślnie');
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
    };


    //TODO style do zmiany
    return(
        <React.Fragment>
            <div className={'diseaseListEntry'}  >
                <p>{disease.nazwa}</p>
                <p>{disease.opis}</p>
                <img src={'/img/deleteIcon.png'} alt={'delete icon'} onClick={deleteDisease} className={'deleteIcon'}/>
            </div>
            <hr/>
        </React.Fragment>

    )
};

export default BeehiveDiseaseListEntry;