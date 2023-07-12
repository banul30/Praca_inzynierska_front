import React from "react";

const LoadingPage = () =>{

    return(
        <>
            <img src={'/img/flyingBee.gif'} alt={'flying bee'} className={'loadingPage'}/>
            <h1 className={'loadingPage'}>Loading...</h1>
        </>
    );
};

export default LoadingPage;