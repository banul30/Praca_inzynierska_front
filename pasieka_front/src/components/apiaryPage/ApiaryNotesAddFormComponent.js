import React, {useState} from "react";
import {getNewAccessToken} from "../../utils/validationUtils";
import {postApiaryNoteApiCall} from "../../api/apiaryCalls";
import {useNavigate} from "react-router-dom";

const ApiaryNotesAddFormComponent = (props) =>{

    const [apiaryId] = useState(props.apiaryId);
    const setShowAddNoteForm = props.setShowAddNoteForm;
    const [date, setDate] = useState('');
    const [text, setText] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        let data = {
            pasiekaId: apiaryId,
            note: text,
            date: date
        }
        e.preventDefault();
        postApiaryNoteApiCall(data).then((resp) => {
            if(resp.status >=200 && resp.status < 300){
                window.location.reload();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessToken(navigate).then((r) =>{
                    postApiaryNoteApiCall(data).then((resp) => {
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

        setDate('');
        setText('');
    }

    const currentDate = () =>{
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd ;
        return today;
    }

    return(
        <>
            <h1>Tworzenie Notatki</h1>
                {<form className={'loginForm'} onSubmit={handleSubmit}>
                    <div className={'addApiary-form-grid'}>
                        <label htmlFor="date">Data: </label>
                        <input id="1" name="date" type="date" min={currentDate()}  value={date} required onChange={(e) => setDate(e.target.value)}/>

                        <textarea id="3" name="text" maxLength={450} placeholder={"Tekst..."} value={text} required onChange={(e) => setText(e.target.value)} style={{width:'300%', height:'180%'}}/>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <input  type="submit" className={'submitBtn'} value={'Zapisz'}/>
                    <button className={'apiarySelectButton'} onClick={() => setShowAddNoteForm(false)}>Anuluj</button>
                </form>}
        </>
    )

};

export default ApiaryNotesAddFormComponent;