const router = require('express').Router()
const Person = require('../models/person')

router.post('/reset', async (request, response) => {
  await Person.deleteMany({})

  response.status(204).end()
})

module.exports = router
