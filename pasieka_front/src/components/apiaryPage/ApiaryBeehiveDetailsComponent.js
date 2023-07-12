import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteBeehiveApiCall} from "../../api/beehiveCalls";
import {getNewAccessToken} from "../../utils/validationUtils";

const ApiaryBeehiveDetailsComponent = (props) =>{

    const [selectedBeehive, setSelectedBeehive] = useState(props.selectedBeehive);
    const navigate = useNavigate();

    useEffect(()=>{ setSelectedBeehive(props.selectedBeehive)},[props.selectedBeehive]);

    const deleteBeehive = () =>{
        if(window.confirm('Usunięcie wybranego ula spowoduje bezpowrotne usunięcie wszystkich powiązanych z nim danych')){
            deleteBeehiveApiCall(selectedBeehive.ulId).then((resp) => {
                if(resp.status >=200 && resp.status < 300){
                    window.location.reload();
                    window.alert('Ul usunięto pomyślnie');
                }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                    getNewAccessToken(navigate).then((r) =>{
                        deleteBeehiveApiCall(selectedBeehive.ulId).then((resp) => {
                            if(resp.status >=200 && resp.status < 300){
                                window.location.reload();
                                window.alert('Ul usunięto pomyślnie');
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
        <div className={'apiaryBeehiveDetails'}>
            <h1>Szczegóły Ula</h1>
            <div className={'apiaryBeehiveDetails-grid'} style={{marginBottom:'0.1vh'}}>
                <h2>Nazwa:  {selectedBeehive.nazwa}</h2>
                <h2>Poziom agresji:  {selectedBeehive.poziomAgresji}</h2>
                <h2>Rodzaj korpusu:  {selectedBeehive.rodzajKorpusu}</h2>
                <h2>Rodzaj ramek:  {selectedBeehive.rodzajRamek}</h2>
                <h2 style={{marginBottom:'0.5vh'}}>Liczba alertów:  {selectedBeehive.alertSet.length}</h2>
                <h2 style={{marginBottom:'0.5vh'}}>Choroby:  {selectedBeehive.chorobaSet.length}</h2>
            </div>
            <button className={'mainPageButton'} onClick={()=>{navigate('/ul/'+selectedBeehive.ulId)}} >Wyświetl</button>
            <button className={'apiaryDetailsDeleteButton'} onClick={deleteBeehive} >Usuń</button>
        </div>
    );
};

export default ApiaryBeehiveDetailsComponent;