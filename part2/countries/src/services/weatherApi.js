import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const api_key = process.env.REACT_APP_API_KEY;

const getCityWeatherReport = async (cityName) => {
  const request = axios.get(
    `${baseUrl}q=${cityName}&appid=${api_key}&units=metric`
  );
  return request.then((response) => response.data);
};

const weatherApi = { getCityWeatherReport };
export default weatherApi;
