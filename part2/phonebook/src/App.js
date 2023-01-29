import { useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const initialInputs = {
  newName: "",
  newNumber: "",
  filter: "",
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [inputs, setInputs] = useState(initialInputs);
  const { newName, newNumber, filter } = inputs;

  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(filter)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.every(({ name }) => name !== newName)) {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        })
      );
      setInputs({ ...inputs, newName: "", newNumber: "" });
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h3>Phonebook</h3>
      <Filter onChange={handleInputChange} value={filter} />
      <h3>add a new</h3>
      <PersonForm
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        values={(newName, newNumber)}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
