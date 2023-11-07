import React from 'react'

const PersonForm = ({
  addPerson,
  newName, handleNameChange,
  newNumber, handleNumberChange,
}) => (
  <form onSubmit={addPerson}>
    <div>
      name:
      {' '}
      <input id="name" value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number:
      {' '}
      <input id="number" value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm
