import React, {useState} from "react";
import BeehiveMotherBeeDetailsComponent from "./BeehiveMotherBeeDetailsComponent";
import BeehiveMotherBeeAddComponent from "./BeehiveMotherBeeAddComponent";
import BeehiveMotherBeeEditComponent from "./BeehiveMotherBeeEditComponent";

const BeehiveMotherBeeComponent = (props) =>{

    const [motherBee] = useState(props.motherBee);
    const [beehiveId] = useState(props.beehiveId);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    return(
        <div className={'beehiveMotherBee'}>
            {(()=>{
               if(showEditForm){
                   return <BeehiveMotherBeeEditComponent setShowEditForm={setShowEditForm} setShowAddForm={setShowAddForm} motherBee={motherBee}/>
               } else if(showAddForm) {
                   return <BeehiveMotherBeeAddComponent beehiveId={beehiveId} setShowEditForm={setShowEditForm} setShowAddForm={setShowAddForm}/>
               }else{
                   return <BeehiveMotherBeeDetailsComponent motherBee={motherBee} beehiveId={beehiveId} setShowEditForm={setShowEditForm} setShowAddForm={setShowAddForm}/>
               }
            })()}

        </div>
    );
};

export default BeehiveMotherBeeComponent;