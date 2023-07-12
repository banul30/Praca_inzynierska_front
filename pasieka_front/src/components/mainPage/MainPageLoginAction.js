import React from "react";
import LoginForm from "./LoginForm";

const MainPageLoginAction = (props) =>{
    const {setDefaultPage, setLoginPage, setRegisterPage} = props.config;


    const activateAnimation = () =>{
        const combL = document.getElementById('CombL');
        const combR = document.getElementById('CombR');
        console.log(combL);
        console.log(combR);
        combL.classList.remove('honeyCombL');
        combR.classList.remove('honeyCombR');
        void combL.offsetWidth;
        combL.classList.add('honeyCombL');
        combR.classList.add('honeyCombR');
    }

    const changeToMainPage = () =>{
        activateAnimation();
        setRegisterPage(false);
        setLoginPage(false);
        setDefaultPage(true);
    }
    const changeToRegisterPage = () =>{
        activateAnimation();
        setDefaultPage(false);
        setLoginPage(false);
        setRegisterPage(true);
    }

    return(
        <div className={'mainSelect'}>
            <h1>Pasieka 2.0</h1>
            <h2>Logowanie</h2>
            <br/>
            <br/>
            <LoginForm/>
            <br/>
            <br/>
            <button className={'mainPageButton'} onClick={changeToRegisterPage}>Zarejestruj się</button>
            <br/>
            <button className={'mainPageButton'} onClick={changeToMainPage}>Wróć</button>
        </div>
    );
}

export default MainPageLoginAction;