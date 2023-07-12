import React, { useState} from "react";
import {useNavigate} from "react-router-dom";
import {encodePassword} from "../../utils/validationUtils";

const LoginForm = () =>{

    const [login,setLogin] = useState('test1@zz.pl');
    const [password,setPassword] = useState('pass');
    const navigate = useNavigate();


    const handleSubmit = (e) =>{
        e.preventDefault();
        const encryptedPassword = encodePassword(password);
        console.log(encryptedPassword);
        const url = `http://localhost:8080/api/tests/sec/login`;
        const options ={
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-XSRF-TOKEN': localStorage.getItem('csrfToken')
            },
            body: new URLSearchParams({
                'username': login,
                'password': encryptedPassword
            }),
            credentials: 'include'
        }
        const promise = fetch(url,options);
        promise.then((resp) => {
            if(resp.status >=200 && resp.status < 300){
                localStorage.setItem('jwtAccessToken', resp.headers.get('access_token'));
                console.log('Added access token to local storage');
                localStorage.setItem('jwtRefreshToken', resp.headers.get('refresh_token'));
                console.log('Added refresh token to local storage');
                navigate('/pasieki');
            }else if(resp.status >= 400 && resp.status < 500){
                window.alert("Niepoprawny login lub hasło!");
            }else{
                navigate('/error/'+resp.status);
            }
        }).catch((reason => console.log(reason)));

        setLogin('');
        setPassword('');
    };

    return (
        <form className={'loginForm'} onSubmit={handleSubmit}>
            <div className={'login-form-grid'}>
                <label htmlFor="Login">Login: </label>
                <input id="1" name="Login" type="email" maxLength="60" value={login} required onChange={(e) => setLogin(e.target.value)}/>
                <label htmlFor="Haslo">Hasło: </label>
                <input id="2" name="Haslo" type="password" maxLength="60" value={password} required onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <input  type="submit" className={'submitBtn'} value={'Zaloguj'}/>
        </form>
    );
};

export default LoginForm;