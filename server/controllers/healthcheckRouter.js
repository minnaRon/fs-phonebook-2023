const router = require('express').Router()

router.get('/health', (req, res) => {
  res.send('ok')
})

router.get('/version', (req, res) => {
  res.send('1') // change this string to ensure a new version deployed
})

module.exports = router
