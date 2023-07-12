import React, {useEffect, useState} from "react";
import MainPageChoseAction from "./MainPageChoseAction";
import MainPageLoginAction from "./MainPageLoginAction";
import MainPageRegisterAction from "./MainPageRegisterAction";
import {getCsrfToken} from "../../utils/validationUtils";

const MainPage = () =>{

    const [defaultPage, setDefaultPage] = useState(true);
    const [loginPage, setLoginPage] = useState(false);
    const [registerPage, setRegisterPage] = useState(false);

    const config = {setDefaultPage, setLoginPage, setRegisterPage}

    useEffect(() =>{
        getCsrfToken();
    }, []);

    return (
        <div className={'mainPage'}>
            {(() => {
                if(defaultPage){
                    return (<MainPageChoseAction config={config} />);
                }
                if(loginPage) {
                    return (<MainPageLoginAction config={config}/>);
                }
                if(registerPage){
                    return (<MainPageRegisterAction config={config}/>);
                }

            })()}

            <img src={'/img/honeyCombL.png'} alt={'honey comb left'} className={'honeyCombL'} id={'CombL'}/>
            <img src={'/img/honeyCombR.png'} alt={'honey comb left'} className={'honeyCombR'} id={'CombR'}/>
        </div>
    );
};

export default MainPage;