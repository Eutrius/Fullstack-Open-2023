import React from "react";

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(({ name, number, id }) => (
        <p key={id}>
          {name} {number}
        </p>
      ))}
    </>
  );
};

export default Persons;
