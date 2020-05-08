import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
import Search from "./components/Search";
import AddPerson from "./components/AddPerson";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({
    message: "",
    status: ""
  });

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

            setNotificationMessage({
              message: `Updated ${returnedPerson.name}`,
              status: "success"
            });
            setTimeout(() => {
              setNotificationMessage({
                message: "",
                status: ""
              });
            }, 5000);

            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            setNotificationMessage({
              message: error,
              status: "error"
            });
            setTimeout(() => {
              setNotificationMessage({
                message: "",
                status: ""
              });
            }, 5000);
          });
      }
    } else {
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));

        setNotificationMessage({
          message: `Added ${returnedPerson.name}`,
          status: "success"
        });
        setTimeout(() => {
          setNotificationMessage({
            message: "",
            status: ""
          });
        }, 5000);

        setNewName("");
        setNewNumber("");
      });
    }
  };

  const removePerson = ({ id, name }) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(returnedPerson => {
        setPersons(persons.filter(returnedPerson => returnedPerson.id !== id));
      });
    }
  };

  const validateNewPerson = name => {
    const nameValidation = persons.find(person => person.name === name);

    if (nameValidation) {
      alert(`${name} is already added to the phonebook`);
      return;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notificationMessage} />
      <Search handleSearchChange={handleSearchChange} />
      <AddPerson
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Names</h2>
      {persons.map(person => (
        <div className="flex" key={person.id}>
          <p>
            {person.name} - {person.number}
          </p>
          <button type="button" onClick={() => removePerson(person)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
