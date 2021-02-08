import React, { useState } from "react";
import { PersonForm, PersonFilterForm, PersonList } from "./Person";

const App = () => {
  // Default data from the course materials
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

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
