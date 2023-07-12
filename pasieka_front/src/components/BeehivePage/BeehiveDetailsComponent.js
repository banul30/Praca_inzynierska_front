import React, {useEffect, useState} from "react";

const BeehiveDetailsComponent = (props) =>{
    const [beehive, setBehive] = useState(props.beehive);
    const setShowEditBeehiveForm = props.setShowEditBeehiveForm;

    useEffect(() =>{
        setBehive(props.beehive);
    },[props.beehive]);

    return(
        <div className={'beehiveDetails'}>
            <h1>{beehive.nazwa}</h1>
            <div className={'beehiveDetails-grid'}>
                <h2>Rodzaj ramek: {beehive.rodzajRamek}</h2>
                <h2>Rodzaj korpusu: {beehive.rodzajKorpusu}</h2>
                <h2>Poziom agresji: {beehive.poziomAgresji}</h2>
                <h2>Rasa: {beehive.rasa}</h2>
            </div>
            <button className={'apiarySelectButton'} onClick={()=>setShowEditBeehiveForm(true)}>Edytuj</button>
            <h2>Alerty</h2>
            <div className={'beehiveAlertList'}>
                {(() =>{
                    if(beehive.alertSet.length>0){
                        return(
                            <React.Fragment >
                                {beehive.alertSet.map(alert =>(
                                    <React.Fragment key={alert.alertId}>
                                        <img src={'/img/errorIcon.png'} alt={'apiary error icon'} style={{marginTop:'0.3vh'}} className={'diseaseOkIcon'}/>
                                        <p style={{marginTop:'0'}}>{alert.informacja}</p>
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
                                <img src={'/img/okIcon.png'} alt={'ok icon'} className={'diseaseOkIcon'}/>
                            </React.Fragment>
                        )
                    }
                })()}
            </div>

        </div>
    );
};

export default BeehiveDetailsComponent;