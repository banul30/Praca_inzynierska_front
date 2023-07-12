import React, {useEffect, useState} from "react";
import ApiaryBeehiveListEntry from "./ApiaryBeehiveListEntry";

const ApiaryBeehiveSelectComponent = (props) =>{

    const [beehives, setBeehives] = useState(props.beehives);
    const setSelectedBeehive = props.setSelectedBeehive;
    const setShowAddForm = props.setShowAddForm;

    useEffect(() =>{
        setBeehives(props.beehives);
    },[props.beehives]);

    const showAddForm = () =>{
        let allEntries = document.querySelectorAll('.beehiveListEntry');
        allEntries.forEach(options =>{
            options.style.background = ''
        });
        setSelectedBeehive(null);
        setShowAddForm(true);
    }

    return(
        <div className={'beehiveSelect'}>
            <h1>Ule</h1>
            {(() => {
                console.log(beehives);
                if (!beehives || beehives.length === 0){
                    return (
                        <React.Fragment>
                            <br/>
                            <h2>Brak uli do wyświetlenia</h2>
                            <h2>Dodaj ul</h2>
                        </React.Fragment>
                    );
                }else {
                    return (
                        <React.Fragment>
                            <div className={'beehiveList'}>
                                {beehives.map(beehive => (
                                    <ApiaryBeehiveListEntry beehive={beehive} key={beehive.ulId} setSelectedBeehive={setSelectedBeehive} setshowAddForm={setShowAddForm}/>
                                ))}
                            </div>
                        </React.Fragment>
                    );
                }

            })()}
            <button className={'apiarySelectButton'} onClick={showAddForm} >+</button>
        </div>
    );
}

export default ApiaryBeehiveSelectComponent