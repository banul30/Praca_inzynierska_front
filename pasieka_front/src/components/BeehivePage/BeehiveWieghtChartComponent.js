import React, {useEffect, useState} from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import {CheckTokensExistence, getCsrfToken, getNewAccessTokenAndReload} from "../../utils/validationUtils";
import {getWieghtDataApiCall} from "../../api/weightApiCalls";
import {useNavigate} from "react-router-dom";

const BeehiveWieghtChartComponent = (props) =>{
    const setShowWeightChart = props.setShowWeightChart;
    const [wieghtId] = useState(props.wieghtId);
    const navigate = useNavigate();
    const [data, setData] = useState([]); //[{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page A', uv: 200, pv: 2400, amt: 2400}, {name: 'Page A', uv: 200, pv: 2400, amt: 2400}];

    useEffect( () => {
        CheckTokensExistence(navigate);
        getWieghtDataApiCall(wieghtId).then(resp =>{
            if(resp.status >= 200 && resp.status < 300){
                return resp.json();
            }else if(resp.headers.get('error') != null && resp.headers.get('error').startsWith('The Token has expired')){
                getNewAccessTokenAndReload(navigate);
            }else {
                navigate('/error/'+resp.status);
            }
        }).then(data =>{
            setData(data);
            getCsrfToken();
        });

    }, [navigate]);

    return(
        <div className={'beehiveDiseases'}>
            <h1>Wykres Wagi</h1>
            <ResponsiveContainer width="90%" height="64%" style={{marginLeft: '10px'}}>
            <LineChart  data={data} margin={{ top: 10, right: 10, bottom: 5, left: 30}} style={{width: '100%'}}>
                <Line type="monotone" dataKey="waga" stroke="#c23e0a" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" axisLine={{ stroke: '#6b2101' }}/>
                <YAxis axisLine={{ stroke: '#6b2101' }} />
                <Tooltip />
            </LineChart>
            </ResponsiveContainer>
            <button className={'apiarySelectButton'} style={{marginTop: '-0.8vh'}} onClick={()=>setShowWeightChart(false)}>Ukryj</button>
        </div>
    );
};

export default BeehiveWieghtChartComponent;