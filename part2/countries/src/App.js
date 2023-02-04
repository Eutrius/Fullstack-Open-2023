import React, { useState, useEffect } from "react";
import Server from "./services/countries";
import Countries from "./components/Countries";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    Server.getAll().then((response) => {
      setCountries(response);
    });
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleShowButtonClick = (name) => {
    setQuery(name);
  };

  const getFilteredCountries = () => {
    if (query === "") return [];
    let exactMatch = null;
    const filteredCountries = countries.filter((country) => {
      const name = country.name.common.toLowerCase();
      if (name === query.toLowerCase()) {
        exactMatch = [country];
      }
      return name.includes(query);
    });
    return exactMatch || filteredCountries;
  };

  return (
    <div>
      find countries
      <input onChange={handleInputChange} value={query} />
      <Countries
        countries={getFilteredCountries()}
        onShowButtonClick={handleShowButtonClick}
      />
    </div>
  );
};

export default App;
