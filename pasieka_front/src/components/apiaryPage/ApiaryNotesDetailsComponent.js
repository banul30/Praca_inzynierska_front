import React, {useState} from "react";
import {getNewAccessToken} from "../../utils/validationUtils";
import {deleteApiaryNoteApiCall} from "../../api/apiaryCalls";
import {useNavigate} from "react-router-dom";

const ApiaryNotesDetailsComponent = (props) =>{

    const setShowNotes = props.setShowNotes;
    const [apiaryId] = useState(props.apiaryId);
    const [note] = useState(props.note);
    const setShowAddNoteForm = props.setShowAddNoteForm;
    const navigate = useNavigate();

    const deleteNote = () =>{
        if(window.confirm('Czy na pewno chcesz usunąć notatkę?')){
            deleteApiaryNoteApiCall(apiaryId).then((resp) => {
                if(resp.status >=200 && resp.status < 300){
                    window.location.reload();
                    window.alert('Notatkę usunięto pomyślnie');
                }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                    getNewAccessToken(navigate).then((r) =>{
                        deleteApiaryNoteApiCall(apiaryId).then((resp) => {
                            if(resp.status >=200 && resp.status < 300){
                                window.location.reload();
                                window.alert('Notatkę usunięto pomyślnie');
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
          <h1>Notatka Pasieki</h1>

              {(() =>{
                  if( note != null){
                      return(
                          <React.Fragment>
                              <textarea value={note} readOnly={true} className={'apiaryNote'}  style={{width:'80%', height:'60%'}}/>
                          </React.Fragment>
                      )
                  }else{
                      return (
                          <div className={'apiaryAlertList'} style={{width:'70%', height:'60%'}}>
                              <br/>
                              <br/>
                              <p>Brak notatek</p>
                              <br/>
                              <img src={'/img/noteIcon.png'} alt={'note icon'} className={'apiaryNoteIcon'}/>
                          </div>
                      )
                  }
              })()}
          <button className={'apiarySelectButton'} style={{maxWidth:'170px', maxHeight:'40px', marginRight:'0.4vw'}} onClick={() => setShowNotes(false)}>Wróć</button>
          {(() =>{
              if( note != null) {
                  return (
                      <button className={'motherBeeDeleteButton'} style={{maxWidth:'170px', maxHeight:'40px', padding: '0.8vh 0.8vw', marginTop: '0'}} onClick={deleteNote}>Usuń</button>
                  )
              }else{
                  return (
                      <button className={'apiarySelectButton'} style={{maxWidth:'170px', maxHeight:'40px'}} onClick={() => setShowAddNoteForm(true)}>Dodaj notatkę</button>
                  )
              }
          })()}
      </>
    );
};

export default ApiaryNotesDetailsComponent;