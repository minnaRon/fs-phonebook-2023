const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../server')
const Person = require('../server/models/person')

const api = supertest(app)

const testPersons = [
  {
    name: 'testPerson1',
    number: '111-1234567',
  },
  {
    name: 'testPerson2',
    number: '222-2345678',
  },
]

beforeEach(async () => {
  await Person.deleteMany({})
  await Person.insertMany(testPersons)
})

test('persons are returned as json', async () => {
  await api
    .get('/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all persons are returned', async () => {
  const response = await api.get('/persons')
  expect(response.body).toHaveLength(testPersons.length)
})

test('a specific person is within the returned persons', async () => {
  const response = await api.get('/persons')
  const names = response.body.map((p) => p.name)
  expect(names).toContain('testPerson2')
})

test('a valid person can be added ', async () => {
  const newPerson = {
    name: 'testPersonAdded',
    number: '123-234567',
  }
  await api
    .post('/persons')
    .send(newPerson)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/persons')
  const names = response.body.map((p) => p.name)
  expect(response.body).toHaveLength(testPersons.length + 1)
  expect(names).toContain('testPersonAdded')
})

test('person without name is not added', async () => {
  const newPerson = {
    number: '123-345678',
  }
  await api
    .post('/persons')
    .send(newPerson)
    .expect(400)
    .timeout(5000)
  const response = await api.get('/persons')
  expect(response.body).toHaveLength(testPersons.length)
})

test('person without number is not added', async () => {
  const newPerson = {
    name: 'PersonWithoutNumber',
  }
  await api
    .post('/persons')
    .send(newPerson)
    .expect(400)
    .timeout(5000)
  const response = await api.get('/persons')
  expect(response.body).toHaveLength(testPersons.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
