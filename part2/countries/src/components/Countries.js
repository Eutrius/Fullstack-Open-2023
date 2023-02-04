import React from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
  if (countries.length === 0) return null;
  if (countries.length === 1)
    return (
      <>
        <Country country={countries[0]} />
      </>
    );
  if (countries.length > 10) {
    return (
      <>
        <p>Too many matches,specify another filter</p>
      </>
    );
  }
  return (
    <>
      {countries.map((country) => (
        <p>{country.name.common}</p>
      ))}
    </>
  );
};

export default Countries;
