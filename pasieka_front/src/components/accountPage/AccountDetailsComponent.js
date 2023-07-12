import React, {useEffect, useState} from "react";

const AccountDetailsComponent = (props) =>{

    const setShowEditForm = props.setShowEditForm;
    const setShowEditPassForm = props.setShowEditPassForm;
    const setShowAlertForm = props.setShowAlertForm;
    const [user, setUser] = useState(props.user);


    useEffect(() =>{
        setUser(props.user);
    },[props.user]);

    return(
        <div className={'beehiveDetails'} style={{left:'22.5vw',top:'calc(30px + 13vh)'}}>
            <h1>Użytkownik</h1>
            <div className={'beehiveDetails-grid'}>
                <h2>Imie: {user.imie}</h2>
                <h2>Nazwisko: {user.nazwisko}</h2>
            </div>
            <button className={'apiarySelectButton'} onClick={() => setShowEditForm(true)}>Edytuj</button>
            <button className={'apiarySelectButton'} style={{marginLeft:'10px'}} onClick={() => setShowEditPassForm(true)}>Zmień hasło</button>
            <br/>
            <br/>
            <br/>
            <h2>Poinformuj społeczność</h2>
            <br/>
            <button className={'apiarySelectButton'} onClick={() => setShowAlertForm(true)}>Poinformuj o zgnilcu</button>
        </div>
    );

}

export default AccountDetailsComponent;