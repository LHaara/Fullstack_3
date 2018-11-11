const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
    "name": "The Dude",
    "number": "1507-715517",
    "id": 1
  },
  {
    "name": "Dr. Strangelove",
    "number": "1507-715517",
    "id": 2
  },
  {
    "name": "Dr. Jones",
    "number": "1507-715517",
    "id": 3
  },
  {
    "name": "Dr. Strange",
    "number": "1507-715517",
    "id": 4
  },
  {
    "name": "Jari Litmanen",
    "number": "10",
    "id": 5
  }
]

app.get('/info', (req, res) => {
  const d = new Date()
  const amount= persons.length

  res.send("puhelinluettelossa on "+amount+" henkilön tiedot<br></br>"+d)
})

app.get('/', (req, res) => {
  res.send('<h1>Kukkuu!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

