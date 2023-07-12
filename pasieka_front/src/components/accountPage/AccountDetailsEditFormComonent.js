import React, {useState} from "react";
import {putUserApiCall} from "../../api/userCalls";
import {useNavigate} from "react-router-dom";
import {getNewAccessToken} from "../../utils/validationUtils";

const AccountDetailsEditFormComonent = (props) =>{

    const setShowEditForm = props.setShowEditForm;
    const [name, setName] = useState(props.user.imie);
    const [surname, setSurname] = useState(props.user.nazwisko);
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        let data = {
            imie: name,
            nazwisko: surname
        }
        e.preventDefault();
       putUserApiCall(data).then((resp) => {
            if(resp.status >=200 && resp.status < 300){
                window.location.reload();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessToken(navigate).then((r) =>{
                    putUserApiCall(data).then((resp) => {
                        if(resp.status >=200 && resp.status < 300){
                            window.location.reload();
                        }else{
                            navigate('/error/'+resp.status);
                        }
                    });
                });
            }else{
                navigate('/error/'+resp.status);
            }
        }).catch((reason => console.log(reason)));

    };


    return(
        <div className={'beehiveDetails'} style={{left:'22.5vw',top:'calc(30px + 13vh)'}}>
            <h1>Edycja danych</h1>
            <br/>
            {<form className={'loginForm'} onSubmit={handleSubmit}>
                <div className={'addApiary-form-grid'}>
                    <label htmlFor="name">Imie: </label>
                    <input id="1" name="name" type="text" maxLength="40" value={name} required onChange={(e) => setName(e.target.value)}/>

                    <label htmlFor="surname">Nazwisko: </label>
                    <input id="2" name="surname" type="text" maxLength="50" value={surname} required onChange={(e) => setSurname(e.target.value)}/>
                </div>
                <input  type="submit" className={'submitBtn'}  value={'Zapisz'}/>
                <button className={'apiarySelectButton'} onClick={() => setShowEditForm(false)}>Anuluj</button>
            </form>}

        </div>
    );

}

export default AccountDetailsEditFormComonent;