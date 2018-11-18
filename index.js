const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

morgan.token('data', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

app.get('/info', (req, res) => {
  const d = new Date()
  const amount= persons.length

  res.send("puhelinluettelossa on "+amount+" henkilön tiedot<br></br>"+d)
})

app.get('/', (req, res) => {
  res.send('<h1>Kukkuu!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons.map(formatPerson))
    })
})

/* app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }
}) */

app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      response.json(formatPerson(person))
    })

})


app.delete('/api/persons/:id', (request, response) => {
  Person
  .findById(request.params.id)
  .then(person => {
    response.json(formatPerson(person))
  })

/*   const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end() */
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({error: 'name is missing'})
  }
  if (body.number === undefined) {
    return response.status(400).json({error: 'number is missing'})
  }

/*   const checkifalready = persons.find(n => n.name === body.name)
  if (checkifalready !== undefined) {
    return response.status(409).json({error: 'name must be unique'})
  } */


  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedPerson => {
      response.json(formatPerson(savedPerson))

    })

})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

