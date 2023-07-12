import React, {useState} from "react";
import BeehiveDiseaseListEntry from "./BeehiveDiseaseListEntry";

const BeehiveDiseaseComponent = (props) =>{

    const [diseases] = useState(props.diseases);
    const [beehiveId] = useState(props.beehiveId);
    const setShowDiseaseAddForm = props.setShowDiseaseAddForm;

    return(
        <div className={'beehiveDiseases'}>
            <h1>Choroby</h1>
            {(() => {
                if (!diseases || diseases.length === 0){
                    return (
                        <React.Fragment>
                            <br/>
                            <h2>Brak chorób do wyświetlenia</h2>
                            <img src={'/img/okIcon.png'} alt={'ok icon'} className={'diseaseOkIcon'}/>
                            <br/>
                            <br/>
                            <h2>Wprowadź chorobę</h2>
                        </React.Fragment>
                    );
                }else {
                    return (
                        <React.Fragment>
                            <div className={'diseaseList'}>
                                {diseases.map(disease => (
                                    <BeehiveDiseaseListEntry key={disease.chorobaId} disease={disease} beehiveId={beehiveId}/>
                                ))}
                            </div>
                        </React.Fragment>
                    );
                }

            })()}
            <button className={'apiarySelectButton'} onClick={()=>setShowDiseaseAddForm(true)}>+</button>
        </div>
    );
};

export default BeehiveDiseaseComponent;