import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {
    CheckTokensExistence,
    getCsrfToken,
    getNewAccessTokenAndReload
} from "../../utils/validationUtils";
import {getBeehiveByIdApiCall} from "../../api/beehiveCalls";
import LoadingPage from "../other/LoadingPage";
import TopBar from "../other/TopBar";
import BottomBar from "../other/BottomBar";
import BeehiveDetailsComponent from "./BeehiveDetailsComponent";
import BeehiveDiseaseComponent from "./BeehiveDiseaseComponent";
import BeehiveAddDiseaseComponent from "./BeehiveAddDiseaseComponent";
import BeehiveEditFormComponent from "./BeehiveEditFormComponent";
import BeehiveMotherBeeComponent from "./BeehiveMotherBeeComponent";
import BeehiveWeightComponent from "./BeehiveWeightComponent";
import {getAvilableDiseasesApiCall} from "../../api/diseaseCalls";
import BeehiveWieghtChartComponent from "./BeehiveWieghtChartComponent";

const BeehiveMainPage = () =>{

    const {id} = useParams();
    const [beehive, setBeehive] = useState();
    const [diseases, setDiseases] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showAddDiseaseForm, setShowDiseaseAddForm] = useState(false);
    const [showEditBeehiveForm, setShowEditBeehiveForm] = useState(false);
    const [showWeightChart, setShowWeightChart] = useState(false);
    let refreshHelper = false;

    useEffect( () => {
        CheckTokensExistence(navigate);

        getAvilableDiseasesApiCall(id).then(resp =>{
            if(resp.status >= 200 && resp.status < 300){
                return resp.json();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                refreshHelper = true;
                getNewAccessTokenAndReload(navigate);
            }else {
                navigate('/error/'+resp.status);
            }
        }).then(data =>{
            if(!refreshHelper){
                setDiseases(data);
                getBeehiveByIdApiCall(id).then(resp =>{
                    if(resp.status >= 200 && resp.status < 300){
                        return resp.json();
                    }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                        getNewAccessTokenAndReload(navigate);
                    }else {
                        navigate('/error/'+resp.status);
                    }
                }).then(data =>{
                    setBeehive(data);
                    getCsrfToken();
                    setLoading(false);
                });
            }
        });



    }, [navigate]);

    if(loading){
        return (
            <LoadingPage/>
        );
    }else{
        return(
            <>
                <div className={'beehivePage'}>
                    <TopBar/>
                    {(() =>{
                        if(showEditBeehiveForm){
                            return <BeehiveEditFormComponent beehive={beehive} setShowEditBeehiveForm={setShowEditBeehiveForm}/>
                        } else{
                            return <BeehiveDetailsComponent beehive={beehive} setShowEditBeehiveForm={setShowEditBeehiveForm}/>;
                        }
                    })()}

                    {(() => {
                        if(showAddDiseaseForm){
                            return <BeehiveAddDiseaseComponent setShowDiseaseAddForm={setShowDiseaseAddForm}  beehiveId={beehive.ulId} diseases={diseases} />
                        } if(showWeightChart){
                            return  <BeehiveWieghtChartComponent setShowWeightChart={setShowWeightChart} wieghtId={beehive.waga.wagaId}/>
                        } else{
                            return <BeehiveDiseaseComponent diseases={beehive.chorobaSet} setShowDiseaseAddForm={setShowDiseaseAddForm}  beehiveId={beehive.ulId}/>
                        }
                    })()}
                    <BeehiveMotherBeeComponent motherBee={beehive.matkaPszczela} beehiveId={beehive.ulId}/>
                    <BeehiveWeightComponent weight={beehive.waga} beehiveId={beehive.ulId} setShowDiseaseAddForm={setShowDiseaseAddForm} setShowWeightChart={setShowWeightChart}/>

                </div>
                <BottomBar/>
            </>
        );
    }
};


export default BeehiveMainPage;