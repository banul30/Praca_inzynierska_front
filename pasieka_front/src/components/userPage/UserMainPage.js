import React, {useEffect, useState} from "react";
import {getApiariesApiCall} from "../../api/apiaryCalls";
import {
    CheckTokensExistence,
    getCsrfToken,
    getNewAccessTokenAndReload
} from "../../utils/validationUtils";
import {useNavigate} from "react-router-dom";
import BottomBar from "../other/BottomBar";
import TopBar from "../other/TopBar";
import UserApiarySelectComponent from "./UserApiarySelectComponent";
import UserPageAlertsComponent from "./UserPageAlertsComponent";
import UserApiaryDetailsComponent from "./UserApiaryDetailsComponent";
import LoadingPage from "../other/LoadingPage";
import UserAddApiaryFormComponent from "./UserAddApiaryFormComponent";

const UserMainPage = () => {
    const [apiaries, setApiaries] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selectedApiary, setSelectedApiary] = useState();
    const [showAddForm, setShowAddForm] = useState(false);
    const [apiariesErrorsCount, setApiariesErrorsCount] = useState(0);

    useEffect( () => {
       CheckTokensExistence(navigate);
       getApiariesApiCall().then(resp =>{
           if(resp.status >= 200 && resp.status < 300){
               return resp.json();
           }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
               getNewAccessTokenAndReload(navigate);
           }else {
            navigate('/error/'+resp.status);
           }
       }).then(data =>{
           setApiaries(data);
           let count = 0;
           data.forEach(e =>{
               if(!e.healthy){
                   count = count +1;
               }
           })
           setApiariesErrorsCount(count);
           getCsrfToken();
           setLoading(false);
       });

    }, [navigate]);


    if(loading){
        return (
            <LoadingPage/>
        )
    }else{

        return(
            <>
                <div className={'userPage'}>
                    <TopBar/>
                    <UserApiarySelectComponent apiaries={apiaries} setSelectedApiary={setSelectedApiary} setshowAddForm={setShowAddForm}/>
                    <UserPageAlertsComponent key={apiariesErrorsCount} apiaries={apiaries} apiariesErrorsCount={apiariesErrorsCount}/>
                    {(() => {
                        if(selectedApiary){
                            return(
                                <UserApiaryDetailsComponent key={selectedApiary} selectedApiary={selectedApiary}/>
                            );
                        }else if(showAddForm){
                            return (
                                <UserAddApiaryFormComponent/>
                            );
                        }
                    })()}
                </div>
                <BottomBar/>
            </>
        )
    }

};
export default UserMainPage;