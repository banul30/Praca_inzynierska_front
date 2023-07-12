import React, {useEffect, useState} from "react";

const UserPageAlertsComponent = (props) =>{

    const [apiariesErrorsCount, setApiariesErrorsCount] = useState(props.apiariesErrorsCount);

    useEffect(() =>{
        setApiariesErrorsCount(props.apiariesErrorsCount)
    }, [props.apiariesErrorsCount]);

    return(
      <div className={'userPageAlerts'}>
          <h1>Ostrzeżenia</h1>
          <hr/>

          {(() =>{
             if(apiariesErrorsCount>0){
                 return (
                     <>
                         <h2>Ilość ostrzeżeń: {apiariesErrorsCount}</h2>
                         <img src={'/img/errorIcon.png'} alt={'error icon'} className={'okIcon'}/>
                     </>

                 );
             }else{
                 return (
                     <>
                         <h2>Brak aktywnych ostrzeżeń</h2>
                         <img src={'/img/okIcon.png'} alt={'ok icon'} className={'okIcon'}/>
                     </>

                 );
             }

          })()}

      </div>
    );
};

export default UserPageAlertsComponent;