import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.every(({ name }) => name !== newName)) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(searchName)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input
          onChange={(e) => handleInputChange(e, setSearchName)}
          value={searchName}
        />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name:{""}
          <input
            onChange={(e) => handleInputChange(e, setNewName)}
            value={newName}
          />
        </div>
        <div>
          number:{" "}
          <input
            onChange={(e) => handleInputChange(e, setNewNumber)}
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
      {filteredPersons.map(({ name, number }) => (
        <p key={name}>
          {name} {number}
        </p>
      ))}
    </div>
  );
};

export default App;
