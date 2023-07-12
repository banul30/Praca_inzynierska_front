import React, {useState} from "react";
import {deleteMotherBeeApiCall} from "../../api/motherBeeApiCalls";
import {useNavigate} from "react-router-dom";
import {getNewAccessToken} from "../../utils/validationUtils";

const BeehiveMotherBeeDetailsComponent = (props) => {

    const [motherBee] = useState(props.motherBee);
    const [beehiveId] = useState(props.beehiveId);
    const setShowEditForm = props.setShowEditForm;
    const setShowAddForm = props.setShowAddForm;
    const navigate = useNavigate();

    const setEditForm = () =>{
        setShowAddForm(false);
        setShowEditForm(true);
    }

    const setAddForm = () =>{
        setShowEditForm(false);
        setShowAddForm(true);
    }

    const deleteMotherBee = () =>{
        if(window.confirm('Czy na pewno chcesz usunąć matkę pszczelą?')){
            deleteMotherBeeApiCall(motherBee.matkaPszczelaId, beehiveId).then((resp) => {
                if(resp.status >=200 && resp.status < 300){
                    window.location.reload();
                    window.alert('Matkę pszczelą usunięto pomyślnie');
                }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                    getNewAccessToken(navigate).then((r) =>{
                        deleteMotherBeeApiCall(motherBee.matkaPszczelaId).then((resp) => {
                            if(resp.status >=200 && resp.status < 300){
                                window.location.reload();
                                window.alert('Matkę pszczelą usunięto pomyślnie');
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
            <h1>Matka Pszczela</h1>
            {(() =>{
                if(motherBee){
                    return(
                        <React.Fragment>
                            <div className={'beehiveMotherBeeDetails-grid'} style={{marginBottom:'0.1vh'}}>
                                <h2>Data wprowadzenia: </h2>
                                <h2>{motherBee.dataWprowadzenia}</h2>
                                <br/>
                                <h2>Rodzaj pozyskania: </h2>
                                <h2 >{motherBee.rodzajPozyskania}</h2>
                            </div>
                            <button className={'apiarySelectButton'} onClick={setEditForm}>Edytuj</button>
                            <button className={'motherBeeDeleteButton'} onClick={deleteMotherBee}>Usuń</button>
                        </React.Fragment>
                    )
                }else{
                    return (
                        <React.Fragment>
                            <React.Fragment>
                                <br/>
                                <h2>Brak matki pszczelej</h2>
                                <img src={'/img/errorIcon.png'} alt={'error icon'} className={'MotherBeeErrorIcon'}/>
                                <br/>
                                <br/>
                                <h2>Dodaj matkę</h2>
                                <button className={'apiarySelectButton'} onClick={setAddForm}>+</button>
                            </React.Fragment>
                        </React.Fragment>
                    );
                }
            })()}
        </>
    )

};

export default BeehiveMotherBeeDetailsComponent;