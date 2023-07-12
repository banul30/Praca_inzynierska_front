import React from "react";

const MainPageChoseAction = (props) =>{
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

    const changeToLoginPage = () =>{
        activateAnimation();
        setDefaultPage(false);
        setRegisterPage(false);
        setLoginPage(true);
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
                <h2>Witamy!</h2>
                <br/>
                <img src={'/img/beehiveIcon.png'} alt={'beehive icon'} className={'beehiveIcon'}/>
                <br/>
                <br/>
                <button className={'mainPageButton'} onClick={changeToLoginPage}>Zaloguj się</button>
                <br/>
                <button className={'mainPageButton'} onClick={changeToRegisterPage}>Zarejestruj się</button>
            </div>
        );
}

export default MainPageChoseAction;