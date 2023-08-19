import axios from "axios";

export const getWeatherData = async(setWeatherData) => {
  navigator.geolocation.getCurrentPosition(
    // Success
    async(position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      setWeatherData((await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)).data)
    }
    // Error
    , async(e) => {
      if(e.code === 1){
        setWeatherData((await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)).data)
      } else{
        console.log(e)
      }
    }
  )
}