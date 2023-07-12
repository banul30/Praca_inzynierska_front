import React, {useState} from "react";
import BeehiveWeightDetailsComponent from "./BeehiveWeightDetailsComponent";
import BeehiveWeightEditComponent from "./BeehiveWeightEditComponent";
import BeehiveWeightAddComponent from "./BeehiveWeightAddComponent";

const BeehiveWeightComponent = (props) =>{

    const [weight] = useState(props.weight);
    const [beehiveId] = useState(props.beehiveId);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const setShowDiseaseAddForm = props.setShowDiseaseAddForm;
    const setShowWeightChart = props.setShowWeightChart;

    return(
        <div className={'beehiveWeight'}>
            {(()=>{
                if(showEditForm){
                    return <BeehiveWeightEditComponent  setShowEditForm={setShowEditForm} setShowAddForm={setShowAddForm} weight={weight}/>
                } else if(showAddForm) {
                    return <BeehiveWeightAddComponent beehiveId={beehiveId} setShowEditForm={setShowEditForm} setShowAddForm={setShowAddForm}/>
                }else{
                    return <BeehiveWeightDetailsComponent weight={weight} setShowEditForm={setShowEditForm} setShowAddForm={setShowAddForm} setShowDiseaseAddForm={setShowDiseaseAddForm} setShowWeightChart={setShowWeightChart}/>
                }
            })()}
        </div>
    );
};

export default BeehiveWeightComponent;