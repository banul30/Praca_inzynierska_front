import React, {useEffect, useState} from "react";
import {deleteFoodApiCall} from "../../api/apiaryCalls";
import {useNavigate} from "react-router-dom";
import {getNewAccessToken} from "../../utils/validationUtils";

const ApiaryDetailsComponent = (props) =>{

    const [apiary, setApiary] = useState(props.apiary);
    const [beehivesErrorsCount, setBeehivesErrorsCount] = useState(props.beehivesErrorsCount);
    const setShowEditForm = props.setShowEditForm;
    const setShowFoodForm = props.setShowFoodForm;
    const setShowNotes = props.setShowNotes;
    const navigate = useNavigate();

    useEffect(() =>{
        setApiary(props.apiary);
        setBeehivesErrorsCount(props.beehivesErrorsCount)
    },[props.apiary, props.beehivesErrorsCount]);

    const deleteFood = () =>{
        if(window.confirm('Czy na pewno chcesz usunąć pokarm?')){
            deleteFoodApiCall(apiary.pokarm.pokarmId).then((resp) => {
                if(resp.status >=200 && resp.status < 300){
                    window.location.reload();
                    window.alert('Pokarm usunięto pomyślnie');
                }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                    getNewAccessToken(navigate).then((r) =>{
                        deleteFoodApiCall(apiary.pokarm.pokarmId).then((resp) => {
                            if (resp.status >= 200 && resp.status < 300) {
                                window.location.reload();
                                window.alert('Pokarm usunięto pomyślnie');
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
      <div className={'apiaryDetails'}>
          <h1>{apiary.nazwa}</h1>
          <div className={'apiaryDetails-grid'}>
              <h2>Lokalizacja: {apiary.cityName}</h2>
              <h2>Problemy z ulami: {beehivesErrorsCount}</h2>
              {(() =>{
                  if(!apiary.pokarm){
                      return(
                          <>
                              <span style={{textAlign:'left'}}>
                                  <h2>Pokarm: </h2>
                              </span>
                              <span style={{textAlign:'left'}}>
                                  <button className={'apiarySelectButton'} style={{maxWidth:'170px', maxHeight:'40px', marginRight:'0.4vw'}} onClick={() => setShowFoodForm(true)}>Dodaj pokarm</button>
                                  <button className={'apiarySelectButton'} style={{maxWidth:'170px', maxHeight:'40px'}} onClick={() => setShowEditForm(true)}>Edytuj pasiekę</button>
                                  <img src={'/img/noteIcon.png'} alt={'apiary note icon'} className={'apiaryNoteIcon'} onClick={() => setShowNotes(true)}/>
                              </span>
                          </>
                      );
                  }else{
                      return (
                          <>
                              <span style={{textAlign:'left'}}>
                                  <h2>Pokarm: {apiary.pokarm.rodzaj + ' (' + apiary.pokarm.masa + ')'} </h2>
                              </span>
                              <span style={{textAlign:'left'}}>
                                  <button className={'apiaryFoodDeleteButton'} style={{maxWidth:'170px', maxHeight:'40px', marginRight:'0.4vw'}} onClick={deleteFood}>Usuń pokarm</button>
                                  <button className={'apiarySelectButton'} style={{maxWidth:'170px', maxHeight:'40px'}} onClick={() => setShowEditForm(true)}>Edytuj pasiekę</button>
                                  <img src={'/img/noteIcon.png'} alt={'apiary note icon'} className={'apiaryNoteIcon'} onClick={() => setShowNotes(true)}/>
                              </span>
                          </>
                      );
                  }
              })()}


          </div>
          <h2>Alerty</h2>
          <div className={'apiaryAlertList'} style={{maxHeight:'30%'}}>
              {(() =>{
                  if(apiary.alertPogodowySet.length>0){
                      return(
                          <React.Fragment>
                              {apiary.alertPogodowySet.sort((a,b) => a.data.localeCompare(b.data)).map(alert =>(
                                  <React.Fragment key={alert.alertPogodowyId}>
                                      <div className={'apiaryAlertListEntry'} >
                                          <img src={'/img/errorIcon.png'} alt={'apiary error icon'} className={'apiaryAlertListEntryIcon'}/>
                                          <p>{alert.typ}</p>
                                          <p>{alert.data.split('T')[0]}</p>
                                      </div>
                                      <hr/>
                                  </React.Fragment>
                              )) }
                          </React.Fragment>
                      )
                  }else{
                      return (
                          <React.Fragment>
                              <br/>
                              <p>Brak alertów</p>
                              <br/>
                              <img src={'/img/okIcon.png'} alt={'ok icon'} className={'diseaseOkIcon'}/>
                          </React.Fragment>
                      )
                  }
              })()}
          </div>

      </div>
    );
};

export default ApiaryDetailsComponent;