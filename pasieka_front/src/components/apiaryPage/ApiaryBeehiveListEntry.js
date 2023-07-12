import React, {useState} from "react";

const ApiaryBeehiveListEntry = (props)=>{

    const [id] = useState(props.beehive.ulId);
    const [beehive] = useState(props.beehive);
    const setSelectedBeehive = props.setSelectedBeehive;
    const setshowAddForm = props.setshowAddForm;

    const setAsSelected = () =>{
        let allEntries = document.querySelectorAll('.beehiveListEntry');
        allEntries.forEach(options =>{
            options.style.background = ''
        })
        let element = document.getElementById(id);
        element.style.background = '#ffab23 linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)';
        setSelectedBeehive(beehive);
        setshowAddForm(false);
    }

    return(
        <React.Fragment>
            <div className={'beehiveListEntry'} onClick={setAsSelected}  id={id}>
                <img src={'/img/beehiveListIcon.jpg'} alt={'apiary list icon'} className={'beehiveListIcon'}/>
                <p>Ul: {beehive.nazwa}</p>
                {(() => {
                    if(beehive.alertSet.length > 0 || beehive.chorobaSet.length > 0){
                        return(
                            <img src={'/img/errorIcon.png'} alt={'apiary error icon'} className={'beehiveListErrorIcon'}/>
                        );
                    }else{ //TODO zrobić ostatecznego if-a
                        return (
                            <img src={'/img/okIcon.png'} alt={'apiary ok icon'} className={'beehiveListOkIcon'}/>
                        );
                    }

                })()}

            </div>
            <hr/>
        </React.Fragment>

    )
};

export default ApiaryBeehiveListEntry;