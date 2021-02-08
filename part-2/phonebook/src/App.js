import React, { useState, useEffect } from "react";
import axios from "axios";
import { PersonForm, PersonFilterForm, PersonList } from "./Person";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  // fetch data from the server
  useEffect(() => {
    personService.getAll().then((response) => {
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

    // Create the object
    const person = {
      name: newName,
      number: newNumber,
    };

    // Persist to database
    personService
      .create(person)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.error(error);
        alert(`Error adding person: ${error}`);
      });
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

  const deleteHandler = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService
        .remove(id)
        .then((response) => {
          // Delete from local view too
          setPersons(persons.filter((person) => person.id != id));
        })
        .catch((error) => {
          console.error(error);
          alert(`Error deleting person: ${error}`);
        });
    }
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
      <PersonList
        persons={persons}
        filterName={filterName}
        deleteHandler={deleteHandler}
      />
    </main>
  );
};

export default App;
