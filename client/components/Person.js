import React from 'react'

const Person = ({
  name, number, id, removePerson,
}) => (
  <div>
    {name}
    {' '}
    {number}
    <button type="button" onClick={removePerson} value={id}>delete</button>
  </div>
)

export default Person
