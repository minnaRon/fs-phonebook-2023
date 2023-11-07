const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')

const app = express()
const morgan = require('morgan')
const { MONGODB_URI } = require('./util/common')
const { info } = require('./util/logger')
const personsRouter = require('./controllers/personsRouter')
const healthcheckRouter = require('./controllers/healthcheckRouter')
const errorMiddleware = require('./middleware/errorMiddleware')

app.use(express.json())

// eslint-disable-next-line no-unused-vars
morgan.token('body', (request, _response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// const url = process.env.MONGODB_URI
// const url = MONGODB_URI

// logger('connecting to', url)
// mongoose.connect(url)
info('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  }).catch((error) => {
    info('error connecting to MongoDB:', error.message)
  })

app.use('/', personsRouter)
app.use('/gh', healthcheckRouter)

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  const testingRouter = require('./controllers/testingRouter')
  app.use('/testing', testingRouter)
}

app.use(errorMiddleware.unknownEndpoint)

app.use(errorMiddleware.errorHandler)

module.exports = app
