import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";

const API_URL = process.env.REACT_APP_WEATHER_API_URL;
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const weatherApi = axios.create({
    baseURL: API_URL
})

const getWeather = async(date, callback) => {
    console.log(API_URL);
    try{
        const response = await weatherApi.get("/getUltraSrtNcst", {
            params:{
                ServiceKey: API_KEY,
                pageNo: 1,
                numOfRows: 1000,
                dataType: "JSON",
                base_date: `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`,
                base_time: `${date.getHours().toString().padStart(2, '0')}00`,
                nx: 60,
                ny: 127
            }
        },{
            header:{
                "Content-Type" : "application/json; charset=utf-8",
            }
        })
        callback(response.data.response.body.items.item);
    }catch(e){
        callback({error:true});
    }
}


const useWeather = (nowDate, timeDif) => {
    const [lastDate, setLastDate] = useState(nowDate);
    const [weather, setWeather] = useState({done:false});
    const nDate = new Date(Date.parse(nowDate));
    const lDate =  new Date(Date.parse(lastDate));
    if (nDate - lDate > timeDif){
        setLastDate(nowDate);
        getWeather(nDate,(weather)=>{
            if(weather.error){
                return setWeather({error:true, done:false});
            }
            setWeather({weather, done:true});
        });
    }
    useEffect(()=>{
        getWeather(nDate,(weather)=>{
            if(weather.error){
                return setWeather({error:true, done:false});
            }
            setWeather({weather, done:true});
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return weather;
}

export default useWeather;