import React from "react";
import personService from "../services/persons";

const Person = ({ name, number, id, persons, setPersons }) => {
  const deletePerson = () => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      personService
        .remove(id)
        .then(setPersons(persons.filter((person) => person.id !== id)));
    }
  };

  return (
    <div>
      {name} {number}
      <button onClick={deletePerson}> delete </button>
    </div>
  );
};

export default Person;
