import React, { useState, useEffect } from "react";
import axios from "axios";

export const Country = ({ country }) => {
  const { flag, name, capital, population, languages } = country;
  const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

  const [weather, setWeather] = useState({});

  // fetch data from the server
  // NOTE: for some reason this seems to sometimes randomly return
  // "Access Restricted - Your current Subscription Plan does not support HTTPS Encryption."
  // despite _not using https_ in the request. Oh well. Not spending much time debugging
  // this API usage for this course, it's not an important detail for the learning purposes.
  // Additionally, this API seems to be quite slow at times on the free tier. Again, not important though.
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${REACT_APP_API_KEY}&query=${capital}`
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
      });
  }, [country, capital, REACT_APP_API_KEY]);

  return (
    <>
      <h2>{name}</h2>
      <img src={flag} alt={`flag of ${name}`} />
      <p>
        Capital: {capital}
        <br />
        Population: {population}
      </p>
      <h3>Languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language.iso639_2}>{language.name}</li>
        ))}
        <Weather weather={weather} />
      </ul>
    </>
  );
};

export const Weather = ({ weather }) => {
  // Some fairly ugly data accessing here but does its job.
  if (weather === {} || weather.current === undefined) {
    return (
      <>
        <h3>Weather at the capital</h3>
        <p>Loading weather data...</p>
      </>
    );
  }
  const { temperature, wind_speed, wind_dir } = weather.current;
  // Just one description for simplicity. Not important...
  const icon = weather.current.weather_icons[0];
  const description = weather.current.weather_descriptions[0];
  return (
    <>
      <h3>Weather at the capital</h3>
      <p>Temperature: {temperature} Celsius</p>
      <img src={icon} alt={`${description}`} title={`${description}`} />
      <p>
        Wind: {wind_speed} m/s {wind_dir}
      </p>
    </>
  );
};

export const CountryList = ({ countries, filterName, setFilterName }) => {
  let filtered = countries.filter((country) =>
    country.name.toLowerCase().includes(filterName.toLowerCase())
  );
  // Too many results, request to filter
  if (filtered.length > 10) {
    return <p>Too many countries, please specify a filter</p>;
  }
  // Some results, show list
  if (filtered.length > 1) {
    return (
      <ul>
        {filtered.map((country) => (
          <li key={country.name}>
            {country.name}{" "}
            <button onClick={() => setFilterName(country.name)}>Select</button>
          </li>
        ))}
      </ul>
    );
  }
  // One result, render a full description
  if (filtered.length === 1) {
    const country = filtered[0];
    return <Country country={country} />;
  }
  // No results
  if (filtered.length === 0) {
    return <p>No results found</p>;
  }
};

export const CountryFilterForm = ({ filterName, handleFilterNameChange }) => {
  return (
    <form>
      <strong>
        <p>Filter results</p>
      </strong>
      <label htmlFor="filterName">Name contains: </label>
      <input
        id="filterName"
        value={filterName}
        onChange={(event) => handleFilterNameChange(event)}
      />
    </form>
  );
};
