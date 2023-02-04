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

  const countriesToShow = () => {
    if (query === "") return [];
    return countries.filter((country) => {
      const name = country.name.common.toLowerCase();
      return name.includes(query);
    });
  };
  console.log(countriesToShow());

  return (
    <div>
      find countries
      <input onChange={handleInputChange} value={query} />
      <Countries countries={countriesToShow()} />
    </div>
  );
};

export default App;
