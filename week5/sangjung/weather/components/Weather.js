import useDate from "../lib/useDate";
import useWeather from "../lib/useWeather";

const Weather = ()=>{
    const nowDate = useDate(Date());
    const nowWeather = useWeather(nowDate, 100000);
    //console.log(nowWeather);

    const Show = () => {
        if (nowWeather.done){
            const weather = nowWeather.weather;
            return<ul>{weather.map(element => (
                <li key={element.category}>
                    <span>{element.category} :</span>
                    <span>{element.obsrValue}</span>
                </li>
            ))}</ul>;
        }else{
            return <span>Loading...</span>
        }
    }

    return (
        <div>
            <span>현재 서울 날씨</span>
            <ul>
                <li>
                    <span>시간:</span>
                    <span>{nowDate}</span>
                </li>
                <li>
                    <span>날씨:</span>
                    <Show/>
                </li>
            </ul>
        </div>
    )
}

export default Weather;