import React from "react";

const Country = ({ country }) => {
  const { name, capital, flags, area, languages } = country;
  return (
    <div>
      <h1>{name.common}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h4>languanges:</h4>
      <ul>
        {Object.values(languages).map((languange, index) => {
          return <li key={index}>{languange}</li>;
        })}
      </ul>
      <img src={flags.png} alt={flags.alt} />
    </div>
  );
};

export default Country;
