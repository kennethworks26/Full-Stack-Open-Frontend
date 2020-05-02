import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import personService from "./components/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    personService.getAll().then(persons => {
      setPersons(persons);
    });
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = event => {
    setSearchName(event.target.value);
    setPersons(
      persons.filter(person => person.name.toLowerCase().includes(searchName))
    );
  };

  const addPerson = event => {
    event.preventDefault();
    validateNewPerson(newName);

    const personObject = {
      name: newName,
      number: newNumber
    };

    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to the phonebook, replace the old number with the new one?`
        )
      ) {
        personService
          .update(existingPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
          });
      }
    } else {
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const removePerson = ({ id, name }) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(returnedPerson => {
        setPersons(persons.filter(returnedPerson => returnedPerson.id !== id));
      });
    }
  };

  const validateNewPerson = (name, number) => {
    const nameValidation = persons.find(person => person.name === name);

    if (nameValidation) {
      alert(`${name} is already added to the phonebook`);
      return;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Search</h2>
      <div>
        filter shown with <input onChange={handleSearchChange} />
      </div>
      <h2>Add Person</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        debug: {newName} - {newNumber}
      </div>

      <h2>Names</h2>

      {persons.map(person => (
        <Fragment>
          <div key={person.id}>
            <p>
              {person.name} - {person.number}
            </p>
            <button type="button" onClick={() => removePerson(person)}>
              delete
            </button>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default App;
