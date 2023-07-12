import React, {useState} from "react";
import {putUserPasswordApiCall} from "../../api/userCalls";
import {encodePassword, getNewAccessToken} from "../../utils/validationUtils";
import {useNavigate} from "react-router-dom";

const AccountDetailsEditPasswordComponent = (props) =>{

    const setShowEditPassForm = props.setShowEditPassForm;
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) =>{
        const encryptedOldPassword = encodePassword(oldPassword);
        const encryptedNewPassword = encodePassword(newPassword);
        let data = {
            oldPassword: encryptedOldPassword,
            newPassword: encryptedNewPassword
        }
        e.preventDefault();
        if(newPassword === newPassword2){
            putUserPasswordApiCall(data).then((resp) => {
                if(resp.status >=200 && resp.status < 300){
                    window.location.reload();
                    window.alert("Zmieniono hasło");
                }else if(resp.status === 400){
                    window.location.reload();
                    window.alert("Błędne hasło");
                }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                    getNewAccessToken(navigate).then((r) =>{
                        putUserPasswordApiCall(data).then((resp) => {
                            if(resp.status >=200 && resp.status < 300){
                                window.location.reload();
                                window.alert("Zmieniono hasło");
                            }else if(resp.status === 400){
                                window.location.reload();
                                window.alert("Błędne hasło");
                            }else{
                                navigate('/error/'+resp.status);
                            }
                        });
                    });
                }else{
                    navigate('/error/'+resp.status);
                }
            }).catch((reason => console.log(reason)));
            setOldPassword('');
            setNewPassword('');
            setNewPassword2('');
        }else{
            window.alert("Hasła nie są takie same!");
        }

    };


    return(
        <div className={'beehiveDetails'} style={{left:'22.5vw',top:'calc(30px + 13vh)'}}>
            <h1>Zmiana hasła</h1>
            {<form className={'loginForm'} onSubmit={handleSubmit}>
                <div className={'addApiary-form-grid'}>
                    <label htmlFor="oldPassword">Hasło: </label>
                    <input id="1" name="oldPassword" type="password" maxLength="60" value={oldPassword} required onChange={(e) => setOldPassword(e.target.value)}/>

                    <label htmlFor="newPassword">Nowe Hasło: </label>
                    <input id="2" name="newPassword" type="password" maxLength="60" value={newPassword} required onChange={(e) => setNewPassword(e.target.value)}/>

                    <label htmlFor="newPassword2">Nowe Hasło: </label>
                    <input id="3" name="newPassword2" type="password" maxLength="60" value={newPassword2} required onChange={(e) => setNewPassword2(e.target.value)}/>
                </div>
                <input  type="submit" className={'submitBtn'}  value={'Zapisz'}/>
                <button className={'apiarySelectButton'} onClick={() => setShowEditPassForm(false)}>Anuluj</button>
            </form>}
        </div>
    );
};

export default AccountDetailsEditPasswordComponent;