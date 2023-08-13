import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from 'react-bootstrap';
const url = "https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&appid=6a4aeac28d9afc186d0911a8cbf06c0e";
const Weather = () => {
  const [weather, setWeather] = useState(null);
  const getWeather = async () => {
    const currentWeather = await axios.get(url);
    //console.log(currentWeather.data);
    setWeather(currentWeather.data);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getWeather();
  }, []);
  const time = new Date().toLocaleString('ko-KR');

  return (
    <div>
      {weather ? (
        <div>
          <Navbar
            bg="primary"
            variant="dark"
            className="justify-content-center mb-3"
          >
            <Navbar.Brand>Weather</Navbar.Brand>
          </Navbar>
          <h4>
            도시 : {weather.name}({weather.coord.lat}, {weather.coord.lon})
          </h4>
          <h4>온도 : {weather.main.temp}</h4>
          <h4>
            날씨 :
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.name}
            />
            {weather.weather[0].main}
          </h4>
          <h4>{time}</h4>
        </div>
      ) : (
        <p>loading weather...</p>
      )}
    </div>
  );
};

export default Weather;
