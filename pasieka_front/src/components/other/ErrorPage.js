import React from "react";
import { useParams } from 'react-router';

const ErrorPage = () => {

    const {code} = useParams();
    return(
      <React.Fragment>
          <div className={'errorPage'}>
              <img src={'/img/sadBee.png'} alt={'sad bee'} className={'errorPage'}/>
              <h1>Oops looks like something went wrong</h1>
              <h2>Error code: {code}</h2>
          </div>
      </React.Fragment>
    );
}

export default ErrorPage;