import { useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const city = 'Seoul';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, main, weather, dt } = weatherData;
  const utcTimestamp = dt * 1000;
  const localTime = DateTime.fromMillis(utcTimestamp).setZone('Asia/Seoul');

  return (
    <div>
      <h1>{name}의 날씨는?</h1>
      <p>기온: {main.temp}°C</p>
      <p>기상상태: {weather[0].description}</p>
      <p>현재 시각: {localTime.toLocaleString(DateTime.TIME_SIMPLE)}</p>
    </div>
  );
};

export default Weather;

//61286f036a26a88e4050729eabd4fd47
