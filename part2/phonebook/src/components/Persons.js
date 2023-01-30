import React from "react";

const Persons = ({ name, number, onClick }) => {
  return (
    <>
      <p>
        {name} {number}
        <button type="button" onClick={onClick}>
          delete
        </button>
      </p>
    </>
  );
};

export default Persons;
