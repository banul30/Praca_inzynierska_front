import React, {useEffect, useState} from "react";
import {getNewAccessToken} from "../../utils/validationUtils";
import {deleteApiaryApiCall} from "../../api/apiaryCalls";
import {useNavigate} from "react-router-dom";

const UserApiaryDetailsComponent = (props) =>{

    const [selectedApiary, setSelectedApiary] = useState(props.selectedApiary);
    const navigate = useNavigate();

    useEffect(()=>{ setSelectedApiary(props.selectedApiary)},[props.selectedApiary]);

    const deleteApiary = () =>{
      if(window.confirm('Usunięcie wybranej pasieki spowoduje bezpowrotne usunięcie wszystkich powiązanych z nią danych')){
          deleteApiaryApiCall(selectedApiary.pasiekaId).then((resp) => {
              if(resp.status >=200 && resp.status < 300){
                  window.location.reload();
                  window.alert('Pasiekę usunięto pomyślnie');
              }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                  getNewAccessToken(navigate).then((r) =>{
                      deleteApiaryApiCall(selectedApiary.pasiekaId).then((resp) =>{
                          if(resp.status >=200 && resp.status < 300){
                              window.location.reload();
                              window.alert('Pasiekę usunięto pomyślnie');
                          }else{
                              navigate('/error/'+resp.status);
                          }
                      });
                  });
              }
          }).catch((reason => console.log(reason)));

      }
    };

    return(
      <div className={'userApiaryDetails'}>
          <h1>Szczegóły pasieki</h1>
          <div className={'userApiaryDetails-grid'}>
              <h2>Nazwa:  {selectedApiary.nazwa}</h2>
              <h2>Lokalizacja:  {selectedApiary.cityName}</h2>
              <h2>Liczba Alertów: {selectedApiary.liczbaAlertow}</h2>
              <h2>Liczba uli:  {selectedApiary.liczbaUli}</h2>
          </div>
          <button className={'mainPageButton'} onClick={()=>{navigate('/pasieka/'+selectedApiary.pasiekaId)}}>Wyświetl</button>
          <button className={'apiaryDetailsDeleteButton'} onClick={deleteApiary}>Usuń</button>
      </div>
    );
};

export default UserApiaryDetailsComponent;