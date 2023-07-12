import React, {useState} from "react";

const UserApiaryListEntry = (props) =>{

    const [id] = useState(props.apiary.pasiekaId);
    const [apiary] = useState(props.apiary);
    const setSelectedApiary = props.setSelectedApiary;
    const setshowAddForm = props.setshowAddForm;

    const setAsSelected = () =>{
        let allEntries = document.querySelectorAll('.apiaryListEntry');
        allEntries.forEach(options =>{
            options.style.background = ''
        })
        let element = document.getElementById(id);
        element.style.background = '#ffab23 linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)';
        setSelectedApiary(apiary);
        setshowAddForm(false);
    }

    return(
        <React.Fragment>
            <div className={'apiaryListEntry'} onClick={setAsSelected} id={id}>
                <img src={'/img/apiaryListIcon.jpg'} alt={'apiary list icon'} className={'apiaryListIcon'}/>
                <p>Pasieka: {apiary.nazwa}</p>
                {(() => {
                    if(!apiary.healthy && apiary.atmosphericStatus){
                        return (
                            <img src={'/img/errorWeatherIcon.png'} alt={'apiary error icon'} className={'apiaryListErrorIcon'}/>
                        );
                    } else if(apiary.atmosphericStatus){
                        return (
                            <img src={'/img/weatherIcon.png'} alt={'apiary error icon'} className={'apiaryListErrorIcon'}/>
                        );
                    }else if(!apiary.healthy){
                        return(
                            <img src={'/img/errorIcon.png'} alt={'apiary error icon'} className={'apiaryListErrorIcon'}/>
                        );
                    }else{
                        return (
                            <img src={'/img/okIcon.png'} alt={'apiary ok icon'} className={'apiaryListOkIcon'}/>
                        );
                    }
                })()}

            </div>
            <hr/>
        </React.Fragment>

    )
}

export default UserApiaryListEntry