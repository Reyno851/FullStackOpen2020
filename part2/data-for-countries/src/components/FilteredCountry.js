import React, { useState, useEffect } from "react";
import axios from "axios";

const FilteredCountry = ({ filteredCountryDetails }) => {
  const [temperature, setTemperature] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [windDirection, setWindDirection] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://api.weatherstack.com/current?access_key=" +
          process.env.REACT_APP_API_KEY +
          "&query=" +
          filteredCountryDetails.capital
      )
      .then((response) => {
        // Can't just declare a variable here, and then interpolate in return statement below.
        // Instead, use useState() to set state
        setTemperature(response.data.current.temperature);
        setWindSpeed(response.data.current.wind_speed);
        setWindDirection(response.data.current.wind_dir);
        setWeatherIcon(response.data.current.weather_icons[0]);
        setTime(response.data.location.localtime);
        console.log(response.data);
      });
  }, []);

  return (
    <div>
      <h1> {filteredCountryDetails.name} </h1>
      <p> capital {filteredCountryDetails.capital} </p>
      <p> population {filteredCountryDetails.population} </p>
      <h2> languages </h2>
      <ul>
        {filteredCountryDetails.languages.map((language) => (
          <li key={language.name}> {language.name} </li>
        ))}
      </ul>
      {/* Warning results when img has opening and closing tag. Use self-closing tag to avoid error */}
      <img src={filteredCountryDetails.flag} alt="countryFlag" height="200px" />
      <h2> Weather in {filteredCountryDetails.capital} </h2>
      <p> temperature: {temperature} Celcius </p>
      <img src={weatherIcon} alt="weatherIcon" />
      <p>
        Wind: {windSpeed} mph direction {windDirection}
      </p>
      <p> Local time: {time}</p>
    </div>
  );
};

export default FilteredCountry;
