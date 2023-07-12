import React from "react";
import RegisterForm from "./RegisterForm";

const MainPageRegisterAction = (props) =>{
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

    const changeToLoginPage = () =>{
        activateAnimation();
        setDefaultPage(false);
        setRegisterPage(false);
        setLoginPage(true);
    }


    return(
        <div className={'mainSelect'}>
            <h1>Pasieka 2.0</h1>
            <h2>Rejestracja</h2>
            <br/>
            <br/>
            <RegisterForm/>
            <button className={'mainPageButton'} onClick={changeToLoginPage}>Zaloguj się</button>
            <br/>
            <button className={'mainPageButton'} onClick={changeToMainPage}>Wróć</button>
        </div>
    );
}

export default MainPageRegisterAction;