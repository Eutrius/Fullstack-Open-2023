import React from "react";

const PersonForm = ({ onChange, onSubmit, values }) => {
  const { newName, newNumber } = values;
  return (
    <form>
      <div>
        name:{""}
        <input onChange={onChange} value={newName} name={"newName"} />
      </div>
      <div>
        number:{" "}
        <input onChange={onChange} value={newNumber} name={"newNumber"} />
      </div>
      <div>
        <button type="submit" onClick={onSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
