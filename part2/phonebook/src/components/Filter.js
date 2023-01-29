import React from "react";
const Filter = ({ onChange, value }) => {
  return (
    <div>
      filter shown with{" "}
      <input onChange={onChange} value={value} name={"filter"} />
    </div>
  );
};

export default Filter;
