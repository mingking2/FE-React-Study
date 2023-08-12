import { useEffect, useState } from "react";
import { getWeatherData } from "./APIs/Weather";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null)



  useEffect(() => {
    getWeatherData(setWeatherData)
  }, []) 

  return (

    <Container maxWidth="sm"> {weatherData && <div>
        <Typography variant="caption" display="block" gutterBottom>
          현재 위치 : {weatherData.name}
        </Typography>
        <Typography variant="h3" >
          {weatherData.weather[0].main}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {weatherData.weather[0].description}
        </Typography>

        <Paper elevation={3} sx={{
            width: "200px",
            height: "200px",
            backgroundImage: `url(${`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`})`,
            backgroundSize: "cover",
            marginBottom: "10px"
        }}/>

        <Typography variant="h6" gutterBottom>
          현재 온도 : {Math.round(weatherData.main.temp - 273.15)}
        </Typography>

        <Typography variant="body1" gutterBottom>
          (최저온도 : {Math.round(weatherData.main.temp_min - 273.15)}, 최고온도 : {Math.round(weatherData.main.temp_max - 273.15)})
        </Typography>

    </div>}</Container>

  );
}

export default WeatherPage;