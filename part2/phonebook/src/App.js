import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setnewNumber] = useState("");

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.every(({ name }) => name !== newName)) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setnewNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:{" "}
          <input
            onChange={(e) => handleInputChange(e, setNewName)}
            value={newName}
            required={"required"}
          />
        </div>
        <div>
          number:{" "}
          <input
            onChange={(e) => handleInputChange(e, setnewNumber)}
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name, number }) => (
        <p key={name}>
          {name} {number}
        </p>
      ))}
    </div>
  );
};

export default App;
