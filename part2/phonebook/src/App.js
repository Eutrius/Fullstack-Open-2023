import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import server from "./services/persons";

const initialInputs = {
  newName: "",
  newNumber: "",
  filter: "",
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [inputs, setInputs] = useState(initialInputs);
  const { newName, newNumber, filter } = inputs;

  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(filter)
  );

  useEffect(() => {
    server //break
      .getAll()
      .then((response) => setPersons(response));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.every(({ name }) => name !== newName)) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      server //break
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setInputs({ ...inputs, newName: "", newNumber: "" });
        });
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
        values={{ newName, newNumber }}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
