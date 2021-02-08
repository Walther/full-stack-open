import React, { useState, useEffect } from "react";
import axios from "axios";
import { PersonForm, PersonFilterForm, PersonList } from "./Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  // fetch data from the server
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    // Prevent duplicates
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook, not adding`);
      return;
    }

    const person = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(person));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <main role="main">
      <h1>Phonebook</h1>
      <PersonFilterForm
        filterName={filterName}
        handleFilterNameChange={handleFilterNameChange}
      />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <PersonList persons={persons} filterName={filterName} />
    </main>
  );
};

export default App;
