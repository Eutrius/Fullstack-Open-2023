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
    server //
      .getAllPersons()
      .then((response) => setPersons(response))
      .catch((err) => console.log(err));
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
        id: generateId(),
      };
      server //
        .createPerson(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setInputs({ ...inputs, newName: "", newNumber: "" });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const targetPerson = persons.filter(({ name }) => name === newName)[0];
        const changedPerson = { ...targetPerson, number: newNumber };
        server
          .updatePerson(targetPerson.id, changedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : response
              )
            );
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      server //
        .deletePerson(id)
        .catch((err) => console.log(err));
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  const generateId = () => {
    for (let i = 1; i <= persons.length; i++) {
      if (persons.every(({ id }) => id !== i)) {
        return i;
      }
    }
    return persons.length + 1;
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
      {filteredPersons.map(({ name, number, id }) => (
        <Persons
          key={id}
          name={name}
          number={number}
          onClick={() => handleDelete(id, name)}
        />
      ))}
    </div>
  );
};

export default App;
