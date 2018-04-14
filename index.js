const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const uuid = require('uuid/v4')

app.disable('x-powered-by')
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())

const avengers = []

app.get('/avengers', (req, res, next) => {
  res.json({ data: avengers })
})

app.get('/avengers/:id', (req, res, next) => {
  const id = req.params.id
  const avenger = avengers.find(avenger => avenger.id === id)
  if (!avenger) return next({ status: 404, message: `Could not find avenger with id of ${id}` })

  res.json({ data: avenger })
})

app.post('/avengers', (req, res, next) => {
  console.log(req.body)
  const { name, weapon } = req.body
  if (!name || !weapon) return next({ status: 400, message: `Fields name and weapon are required` })

  const avenger = { id: uuid(), name, weapon }
  avengers.push(avenger)
  res.status(201).json({ data: avenger })
})

app.put('/avengers/:id', (req, res, next) => {
  const id = req.params.id
  const avenger = avengers.find(avenger => avenger.id === id)
  if (!avenger) return next({ status: 404, message: `Could not find avenger with id of ${id}` })

  const { name, weapon } = req.body
  if (!name || !weapon) return next({ status: 400, message: `Fields name and weapon are required` })

  avenger.name = name
  avenger.weapon = weapon
  res.status(200).json({ data: avenger })
})

app.delete('/avengers/:id', (req, res, next) => {
  const id = req.params.id
  const avenger = avengers.find(avenger => avenger.id === id)
  if (!avenger) return next({ status: 404, message: `Could not find avenger with id of ${id}` })

  const index = avengers.indexOf(avenger)
  avengers.splice(index, 1)
  res.status(204).json()
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err })
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }})
})

const listener = () => `Listening on port ${port}!`
app.listen(port, listener)

module.exports = app
