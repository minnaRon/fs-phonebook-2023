const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/info', async (_req, res) => {
  const persons = await Person.find({})
  res.send(`<div>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    </div>`)
})

personsRouter.get('/persons', async (_req, res) => {
  const persons = await Person.find({})
  res.json(persons)
})

personsRouter.get('/persons/:id', async (req, res) => {
  const person = await Person.findById(req.params.id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

personsRouter.post('/persons', async (req, res) => {
  const { body } = req
  const person = new Person({ ...body })
  const savedPerson = await person.save()
  res.status(201).json(savedPerson)
})

personsRouter.put('/persons/:id', async (req, res) => {
  const { body } = req
  const person = { ...body }
  const updatedPerson = await Person.findByIdAndUpdate(
    req.params.id,
    person,
    { new: true, runValidators: true, context: 'query' },
  )
  res.json(updatedPerson)
})

personsRouter.delete('/persons/:id', async (req, res) => {
  await Person.findOneAndDelete({ _id: req.params.id })
  res.status(204).end()
})

module.exports = personsRouter
