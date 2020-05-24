import React, { useState, useEffect } from "react";
import "./index.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [inputName, setInputName] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState("");
  const [errorState, setErrorState] = useState(false);

  // Note: useEffect() by default only runs AFTER first rendering
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  var addName = (event) => {
    event.preventDefault(); // Prevent default behavior of adding new name
    if (newName === "" || newNumber === "") {
      alert("Fields cannot be empty"); // Prevent user from submitting if any one field is empty
    } else {
      // Use some function to search if person's name exists and new input number is different from the records
      if (
        persons.some(
          (person) => person.name === newName && person.number !== newNumber
        )
      ) {
        if (
          window.confirm(
            // Prompt user to confirm replacement
            `${newName} is already added to phonebook, replace old number with a new one?`
          )
        ) {
          // If user confirms...
          const duplicatePerson = persons.find(
            // Find the specific duplicated person's object
            (person) => person.name === newName
          );
          const duplicatePersonID = persons.find(
            // Get the ID of the person
            (person) => person.name === newName
          ).id;
          // Create copy of the object of the person to be changed, but update the number
          const changedPerson = { ...duplicatePerson, number: newNumber };

          personService
            .updateNumber(duplicatePersonID, changedPerson) // Call updateNumber from personService, which returns a promise
            .then((changedPerson) => {
              // Upon successfully resolving promise
              setPersons(
                // Use map to look through persons and replace person object with the new person object with updated number
                persons.map((person) =>
                  person.name === newName ? changedPerson : person
                )
              );
              setErrorState(false); // Set error state to false as promise was successfully resolved
              // This will affect css of message in the Message component
              setMessage(`${newName}'s number has been updated`); // Set appropriate message
              setTimeout(() => {
                // Set timeout of message for 5 seconds
                setMessage(null);
              }, 5000);
            })
            .catch((error) => { // If there is validation error during PUT request
              console.log(error.response.data); // console log the error
              setErrorState(true); // Set error state to true
              setMessage(JSON.stringify(error.response.data)); // Set mongoose default error message on screen
              setTimeout(() => {
                // Set timeout for message
                setMessage(null);
              }, 5000);
            });
        }
        // Use some function again to check whether there is a record with the exact same name and number as newName and newNumber
      } else if (
        persons.some(
          (person) => person.name === newName && person.number === newNumber
        )
      ) {
        // Show an alert in this case
        alert(`${newName} has already been added with the number ${newNumber}`);
      } else {
        // Else, if person if completely new
        const nameObject = {
          // Create new object for the person
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        };
        personService
          .create(nameObject) // Call personService.create()
          .then((nameObject) => {
            setPersons(persons.concat(nameObject)); // Set new persons data
            setNewName(""); // Set input field values to blank
            setNewNumber("");
            setErrorState(false);
            setMessage(`Added ${newName}`); // Set appropriate message
            setTimeout(() => {
              // Set timeout for message
              setMessage(null);
            }, 5000);
          })
          .catch((error) => { // If there is validation error when creating new person via POST request
            console.log(error.response.data); // console.log error message
            setErrorState(true); // Set error state to true to toggle CSS
            setMessage(JSON.stringify(error.response.data)); // Set mongoose default error message on screen
            setTimeout(() => { // Set timeout for message
              setMessage(null); 
            }, 5000);
          });
      }
    }
  };

  // Function to set new input name
  var handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  // Function to set new input number
  var handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  var handleInputNameChange = (event) => {
    setInputName(event.target.value);
    if (event.target.value === "") {
      // If input is blank, show all persons
      setShowAll(true);
    } else {
      // else if there is any input, show only filtered results
      setShowAll(false);
    }
  };

  const personsToShow = showAll
    ? persons // If showAll is true, show all persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(inputName.toLowerCase())
      ); // else, filter only searched results

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} errorState={errorState} />
      <Filter
        inputName={inputName}
        handleInputNameChange={handleInputNameChange}
      />
      <h2> add a new </h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
