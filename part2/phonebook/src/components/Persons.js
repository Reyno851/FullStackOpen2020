import React from "react";
import Person from "./Person";

const Persons = ({ personsToShow, persons, setPersons }) => {
  return personsToShow.map((person) => {
    return (
      <Person
        name={person.name}
        number={person.number}
        id={person.id}
        key={person.id}
        persons={persons}
        setPersons={setPersons}
      />
    );
  });
};

export default Persons;
