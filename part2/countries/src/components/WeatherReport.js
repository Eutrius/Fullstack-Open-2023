import React, { useState, useEffect } from "react";
import weatherApi from "../services/weatherApi";

const WeatherReport = ({ city }) => {
  const [weatherReport, setWeatherReport] = useState(null);

  useEffect(() => {
    weatherApi
      .getCityWeatherReport(city)
      .then((response) => setWeatherReport(response));
  }, [city]);

  if (weatherReport === null) return null;
  const { main, weather, wind } = weatherReport;
  return (
    <>
      {" "}
      <h2>Weather in {city}</h2>
      <p>temperature {main.temp} Celcius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
        alt={weather[0].main}
      />
      <p>wind {wind.speed} m/s</p>
    </>
  );
};

export default WeatherReport;
