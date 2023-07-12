import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    CheckTokensExistence,
    getCsrfToken,
    getNewAccessTokenAndReload
} from "../../utils/validationUtils";
import LoadingPage from "../other/LoadingPage";
import TopBar from "../other/TopBar";
import BottomBar from "../other/BottomBar";
import AccountDetailsComponent from "./AccountDetailsComponent";
import AccountDetailsEditFormComonent from "./AccountDetailsEditFormComonent";
import {getUserApiCall} from "../../api/userCalls";
import AccountDetailsEditPasswordComponent from "./AccountDetailsEditPasswordComponent";
import AccountAddAlertFormComponent from "./AccountAddAlertFormComponent";

const AccountMainPage = () =>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [showEditForm, setShowEditForm] = useState(false);
    const [showEditPassForm, setShowEditPassForm] = useState(false);
    const [showAlertForm, setShowAlertForm] = useState(false);

    useEffect( () => {
        CheckTokensExistence(navigate);
        getUserApiCall().then(resp =>{
            if(resp.status >= 200 && resp.status < 300){
                return resp.json();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessTokenAndReload(navigate);
            }else {
                navigate('/error/'+resp.status);
            }
        }).then(data =>{
            setUser(data);
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
                <div className={'accountPage'}>
                    <TopBar/>
                    {(() =>{
                        if(showEditForm){
                            return <AccountDetailsEditFormComonent setShowEditForm={setShowEditForm} user={user}/>
                        }else if(showEditPassForm) {
                            return <AccountDetailsEditPasswordComponent setShowEditPassForm={setShowEditPassForm}/>
                        }else if(showAlertForm){
                            return <AccountAddAlertFormComponent setShowAlertForm={setShowAlertForm}/>
                        }else{
                            return <AccountDetailsComponent setShowEditForm={setShowEditForm} setShowEditPassForm={setShowEditPassForm} setShowAlertForm={setShowAlertForm} user={user}/>;
                        }
                    })()}
                </div>
                <BottomBar/>
            </>

        )
    }
}

export default AccountMainPage;