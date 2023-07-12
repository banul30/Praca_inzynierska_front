import React, {useState} from "react";
import UserApiaryListEntry from "./UserApiaryListEntry";

const UserApiarySelectComponent = (props) =>{

    const [apiaries] = useState(props.apiaries);
    const setSelectedApiary = props.setSelectedApiary;
    const setshowAddForm = props.setshowAddForm;

    const showAddForm = () =>{
        let allEntries = document.querySelectorAll('.apiaryListEntry');
        allEntries.forEach(options =>{
            options.style.background = ''
        });
        setSelectedApiary(null);
        setshowAddForm(true);
    }

    return(
      <div className={'apiarySelect'}>
          <h1>Pasieki</h1>
          {(() => {
              if (!apiaries || apiaries.length === 0){
                  return (
                    <React.Fragment>
                        <br/>
                        <h2>Brak pasiek do wyświetlenia</h2>
                        <h2>Dodaj pasiekę</h2>
                    </React.Fragment>
                  );
              }else {
                  return (
                          <div className={'apiaryList'}>
                              {apiaries.map(apiary => (
                                      <UserApiaryListEntry apiary={apiary} key={apiary.pasiekaId} setSelectedApiary={setSelectedApiary} setshowAddForm={setshowAddForm}/>
                              ))}
                          </div>
                  );
              }

          })()}
          <button className={'apiarySelectButton'} onClick={showAddForm} >+</button>
      </div>
    );
};

export default UserApiarySelectComponent;