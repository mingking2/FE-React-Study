import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = '1d1350432e4efd0d534cc7c934e4b8e4';
        const cityId = '1835848';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`;

        const response = await axios.get(apiUrl);
        setWeather(response.data);
      } catch (error) {
        console.error('날씨 정보를 불러오는데 에러 발생:', error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weather) {
    return (
      <div>
        <Link to="/">홈으로 이동</Link>
        <h1>Weather Page</h1>
        <p>날씨 정보를 불러오는 중...</p>
      </div>
    );
  }


  const { name, main, weather: weatherInfo } = weather;
  const temperature = main.temp;
  const temperatureCelsius = (temperature - 273.15).toFixed(1); // 섭씨 변환 및 소수점 첫째 자리까지

  const weatherDescription = weatherInfo[0].description;

  return (
    <div>
      <Link to="/">홈으로 이동</Link>
      <h1>Weather Page</h1>
      <p>지역: {name}</p>
      <p>현재 기온: {temperatureCelsius} °C</p>
      <p>날씨: {weatherDescription}</p>
    </div>
  );
};

export default WeatherPage;
