import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {encodePassword} from "../../utils/validationUtils";

const RegisterForm = () =>{
    const [login,setLogin] = useState('');
    const [password,setPassword] = useState('');
    const [password2,setPassword2] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        const encryptedPassword = encodePassword(password);
        let data = {
            username: login,
            password: encryptedPassword
        }
        e.preventDefault();
        const url = `http://localhost:8080/api/tests/sec/add`;
        const options ={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': localStorage.getItem('csrfToken')
            },
            body: JSON.stringify(data),
            credentials: 'include'
        }
        if(password === password2){
            const promise = fetch(url,options);
            promise.then((resp) => {
                if(resp.status >=200 && resp.status < 300){
                    window.alert("Utworzono konto");
                    window.location.reload();
                }else{
                    window.alert("Nie udało się utworzyć konta");
                }
            }).catch((reason => console.log(reason)));

            setLogin('');
            setPassword('');
            setPassword2('');
        }else{
            window.alert("Hasła nie są takie same!");
        }

    };

    return (
        <form className="loginForm" onSubmit={handleSubmit}>
            <div className={'register-form-grid'}>
                <label htmlFor="Login">Login: </label>
                <input id="1" name="Login" type="email" maxLength="60" value={login} required onChange={(e) => setLogin(e.target.value)}/>

                <label htmlFor="Haslo">Hasło: </label>
                <input id="2" name="Haslo" type="password" maxLength="60" value={password} required onChange={(e) => setPassword(e.target.value)}/>

                <label htmlFor="Haslo2">Powtórz hasło: </label>
                <input id="3" name="Haslo2" type="password" maxLength="60" value={password2} required onChange={(e) => setPassword2(e.target.value)}/>
            </div>
            <br/>
            <input  type="submit" className={'submitBtn'} value={'Zarejestruj'}/>
        </form>
    );
};

export default RegisterForm;