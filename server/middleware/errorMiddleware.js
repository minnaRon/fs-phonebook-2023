const errorHandler = (error, req, res, next) => {
  if (error.name === 'ApplicationError') {
    return res.status(error.status).send({ error: error.message })
  }
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  res.status(500).send({ error: error.message })
  return next(error)
}

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { errorHandler, unknownEndpoint }
