import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import TopBar from "../other/TopBar";
import BottomBar from "../other/BottomBar";
import {
    CheckTokensExistence,
    getCsrfToken,
    getNewAccessTokenAndReload
} from "../../utils/validationUtils";
import {useNavigate} from "react-router-dom";
import {getBeehivesApiCall} from "../../api/beehiveCalls";
import LoadingPage from "../other/LoadingPage";
import ApiaryBeehiveSelectComponent from "../apiaryPage/ApiaryBeehiveSelectComponent";
import ApiaryBeehiveDetailsComponent from "./ApiaryBeehiveDetailsComponent";
import ApiaryAddBeehiveFormComponent from "./ApiaryAddBeehiveFormComponent";
import ApiaryDetailsComponent from "./ApiaryDetailsComponent";
import {getApiaryByIdApiCall} from "../../api/apiaryCalls";
import ApiaryEditFormComponent from "./ApiaryEditFormComponent";
import ApiaryAddFoodFormComponent from "./ApiaryAddFoodFormComponent";
import ApiaryWeatherComponent from "./ApiaryWeatherComponent";
import ApiaryNotesComponent from "./ApiaryNotesComponent";

const ApiaryMainPage = () =>{

    const {id} = useParams();
    const [beehives, setBeehives] = useState([]);
    const [apiary, setApiary] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selectedBeehive, setSelectedBeehive] = useState();
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showFoodForm, setShowFoodForm] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [beehivesErrorsCount, setBeehivesErrorsCount] = useState(0);


    useEffect( () => {
        CheckTokensExistence(navigate);
        getBeehivesApiCall(id).then(resp =>{
            if(resp.status >= 200 && resp.status < 300){
                return resp.json();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessTokenAndReload(navigate);
            }else{
                navigate('/error/'+resp.status);
            }
        }).then(data =>{
            console.log(data);
                setBeehives(data);
                data.forEach(beehive =>{
                    if(beehive.alertSet.length > 0){
                        setBeehivesErrorsCount(beehivesErrorsCount+1)
                    }
                })
            getApiaryByIdApiCall(id).then(resp =>{
                if(resp.status >= 200 && resp.status < 300){
                    return resp.json();
                }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                    getNewAccessTokenAndReload(navigate);
                }else {
                    navigate('/error/'+resp.status);
                }
            }).then(data =>{
                setApiary(data);
                getCsrfToken();
                setLoading(false);
            });
        })

    }, []);



    if(loading){
        return (
            <LoadingPage/>
        );
    }else{
        return(
            <>
                <div className={'apiaryPage'}>
                    <TopBar/>
                    <ApiaryWeatherComponent cityId={apiary.cityId}/>

                    <ApiaryBeehiveSelectComponent beehives={beehives} setSelectedBeehive={setSelectedBeehive} setShowAddForm={setShowAddForm}/>
                    {(() => {
                        if(showEditForm){
                            return(
                                <ApiaryEditFormComponent  apiary={apiary} setShowEditForm={setShowEditForm}/>
                            );
                        }else if(showFoodForm){
                            return (
                                <ApiaryAddFoodFormComponent apiaryId={id} setShowFoodForm={setShowFoodForm}/>
                            );
                        }else if(showNotes){
                            return (
                                <ApiaryNotesComponent apiaryId={id} note={apiary.note} setShowNotes={setShowNotes}/>
                            );
                        }else{
                            return(
                                <ApiaryDetailsComponent apiary={apiary} beehivesErrorsCount={beehivesErrorsCount} setShowEditForm={setShowEditForm} setShowFoodForm={setShowFoodForm} setShowNotes={setShowNotes}/>
                            );
                        }
                    })()}
                    {(() => {
                        if(selectedBeehive){
                            return(
                                <ApiaryBeehiveDetailsComponent key={selectedBeehive} selectedBeehive={selectedBeehive}/>
                            );
                        }else if(showAddForm){
                            return (
                                <ApiaryAddBeehiveFormComponent id={id}/>
                            );
                        }
                    })()}
                </div>
                <BottomBar/>
            </>
        );
    }
};

export default ApiaryMainPage;