import React from "react";

export const Country = ({ country }) => {
  const { flag, name, capital, population, languages } = country;
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
      </ul>
    </>
  );
};

export const CountryList = ({ countries, filterName }) => {
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
          <li key={country.name}>{country.name}</li>
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
