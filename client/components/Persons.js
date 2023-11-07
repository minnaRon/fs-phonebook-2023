import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, removePerson }) => (
  <div>
    {persons
      .filter((person) => person.name.toLowerCase().includes(filter))
      .map((person) => <Person key={person.id} id={person.id} name={person.name} number={person.number} removePerson={removePerson} />)}
  </div>
)

export default Persons
