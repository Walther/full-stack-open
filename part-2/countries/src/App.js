import React, { useState, useEffect } from "react";
import axios from "axios";
import { CountryFilterForm, CountryList } from "./Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterName, setFilterName] = useState("");

  // fetch data from the server
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <main role="main">
      <h1>Countries</h1>
      <CountryFilterForm
        filterName={filterName}
        handleFilterNameChange={handleFilterNameChange}
      />
      <CountryList
        countries={countries}
        filterName={filterName}
        setFilterName={setFilterName}
      />
    </main>
  );
};

export default App;
