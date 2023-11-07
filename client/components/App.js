import React, { useEffect, useState } from 'react'
import PersonForm from './Personform'
import Persons from './Persons'
import Filter from './Filter'
import Notification from './Notification'
import personService from '../util/services/persons_service'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((persons) => {
        setPersons(persons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value.trim())
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value.trim())
  }

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (!newName || !newNumber) {
      notify('Name or number is missing', 'error')
      return
    }
    const personExisting = persons.find(({ name }) => name === newName)
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (personExisting) {
      // eslint-disable-next-line no-alert
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(personExisting.id, { ...personExisting, number: newNumber })
          .then((newPersonInfo) => {
            setPersons(persons.map((person) => (person.id !== newPersonInfo.id ? person : newPersonInfo)))
            notify(`Updated ${newPersonInfo.name}`)
          }).catch(() => {
            notify(`Information of ${newName} has already been removed from server`, 'error')
            setPersons(persons.filter((person) => person.id !== personExisting.id))
          })
      }
    } else {
      personService
        .create(newPerson)
        .then((savedPerson) => {
          setPersons(persons.concat(savedPerson))
          notify(`Added ${savedPerson.name}`)
        }).catch((error) => {
          notify(error.response.data.error, 'error')
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (event) => {
    const personId = event.target.value
    personService
      .remove(personId)
      .then(() => {
        const personDeleted = persons.find((person) => person.id === personId)
        setPersons(persons.filter((person) => person.id !== personId))
        notify(`Deleted ${personDeleted.name}`)
      })
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} removePerson={removePerson} />
    </>
  )
}

export default App
