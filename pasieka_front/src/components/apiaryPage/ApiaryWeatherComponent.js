import React, {useEffect} from "react";

const ApiaryWeatherComponent = (props) =>{

    useEffect(() =>{
        var cityId = props.cityId
        window.myWidgetParam = [];
/*        var a = window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];*/
        window.myWidgetParam.push(
            { id: 19, cityid: cityId, appid: '80d8fc8e3e61510393bb2f026594812e', units: 'metric', containerid: 'openweathermap-widget-19', }); (function () { var script = document.createElement('script'); script.async = true; script.charset = "utf-8"; script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js"; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s); })();
    }, [])

    return(
        <div className={'weather'}>
            <h1>Pogoda</h1>
            <div id="openweathermap-widget-19" style={{margin:'5% 22%', width:'10vw'}}></div>
        </div>
    );

}

export default ApiaryWeatherComponent;