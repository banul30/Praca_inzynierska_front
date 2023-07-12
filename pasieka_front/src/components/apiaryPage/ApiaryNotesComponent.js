import React, {useState} from "react";
import ApiaryNotesDetailsComponent from "./ApiaryNotesDetailsComponent";
import ApiaryNotesAddFormComponent from "./ApiaryNotesAddFormComponent";

const ApiaryNotesComponent = (props) =>{

    const [apiaryId] = useState(props.apiaryId);
    const [note] = useState(props.note);
    const setShowNotes = props.setShowNotes;
    const [showAddNoteForm, setShowAddNoteForm] = useState(false);


    return(
        <div className={'apiaryNotes'}>
            {(() =>{
                if(showAddNoteForm && note == null){
                    return <ApiaryNotesAddFormComponent setShowAddNoteForm={setShowAddNoteForm} apiaryId={apiaryId}/>
                }else{
                    return <ApiaryNotesDetailsComponent setShowNotes={setShowNotes} note={note} apiaryId={apiaryId} setShowAddNoteForm={setShowAddNoteForm}/>
                }

            })()}
        </div>
    )

};

export default ApiaryNotesComponent;