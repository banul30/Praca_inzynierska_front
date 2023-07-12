import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CheckTokensExistence} from "../../utils/validationUtils";

const UserPage = () =>{

    const navigate = useNavigate();
    
    useEffect(() =>{
        CheckTokensExistence(navigate);
    }, [navigate]);

    return(
        <React.Fragment>
            <h1>Data in local storage</h1>
            <h2>Access Token: {localStorage.getItem('jwtAccessToken')}</h2>
            <h2>Refresh Token: {localStorage.getItem('jwtRefreshToken')}</h2>
            <Link to={'/pasieki'}>Wyświetl Pasieki</Link>
        </React.Fragment>
    )
}

export default UserPage;