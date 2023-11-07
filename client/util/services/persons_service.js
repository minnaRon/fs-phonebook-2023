import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/persons'
// const baseUrl = 'https://phonebook2022.fly.dev/api/persons'
// kun backissa build ja app.use(express.static('build')), niin tämä riittää:
const baseUrl = '/api/persons'

const getAll = () => axios
  .get(baseUrl)
  .then((response) => response.data)

const create = (newPerson) => axios
  .post(baseUrl, newPerson)
  .then((response) => response.data)

const remove = (id) => axios
  .delete(`${baseUrl}/${id}`)
  .then((response) => response.data)

const update = (id, object) => axios
  .put(`${baseUrl}/${id}`, object)
  .then((response) => response.data)
  .then()

export default {
  getAll, create, update, remove,
}
