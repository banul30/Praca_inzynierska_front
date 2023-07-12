import React, {useState} from "react";
import {deleteWeightApiCall} from "../../api/weightApiCalls";
import {useNavigate} from "react-router-dom";
import {getNewAccessToken} from "../../utils/validationUtils";

const BeehiveWeightDetailsComponent = (props) =>{

    const [weight] = useState(props.weight);
    const setShowEditForm = props.setShowEditForm;
    const setShowAddForm = props.setShowAddForm;
    const setShowDiseaseAddForm = props.setShowDiseaseAddForm;
    const setShowWeightChart = props.setShowWeightChart;
    const navigate = useNavigate();

    const setEditForm = () =>{
        setShowAddForm(false);
        setShowEditForm(true);
    }

    const setAddForm = () =>{
        setShowEditForm(false);
        setShowAddForm(true);
    }

    const deleteWeight = () =>{
        if(window.confirm('Czy na pewno chcesz usunąć wagę?')){
            deleteWeightApiCall(weight.wagaId).then((resp) => {
                if(resp.status >=200 && resp.status < 300){
                    window.location.reload();
                    window.alert('Wagę usunięto pomyślnie');
                }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                    getNewAccessToken(navigate).then((r) =>{
                        deleteWeightApiCall(weight.wagaId).then((resp) => {
                            if(resp.status >=200 && resp.status < 300){
                                window.location.reload();
                                window.alert('Wagę usunięto pomyślnie');
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


    return(
        <>
            <h1>Waga</h1>

            {(() =>{
                if(weight){
                    return(
                        <React.Fragment>
                            <img src={'/img/chartIcon.png'} alt={'chart icon'} className={'chartIcon'} onClick={() =>{ setShowDiseaseAddForm(false); setShowWeightChart(true);}}/>
                            <div className={'beehiveMotherBeeDetails-grid'} style={{marginBottom:'0.1vh'}}>
                                <h2>Producent: </h2>
                                <h2>{weight.producent}</h2>
                                <br/>
                                <h2>Model: </h2>
                                <h2>{weight.model}</h2>
                            </div>
                            <button className={'apiarySelectButton'} onClick={setEditForm}>Edytuj</button>
                            <button className={'motherBeeDeleteButton'} onClick={deleteWeight}>Usuń</button>
                        </React.Fragment>
                    )
                }else{
                    return (
                        <React.Fragment>
                            <React.Fragment>
                                <br/>
                                <h2>Dodaj wagę</h2>
                                <br/>
                                <button className={'apiarySelectButton'} onClick={setAddForm}>+</button>
                            </React.Fragment>
                        </React.Fragment>
                    );
                }
            })()}
        </>
    )
};

export default BeehiveWeightDetailsComponent;