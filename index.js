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

app.get('/info', (req, res) => {
  const d = new Date()

  Person
    .estimatedDocumentCount({})
    .then(count => {
      console.log(count)
      res.send('puhelinluettelossa on '+count+' henkilön tiedot<br></br>'+d)
    })
    .catch(error => {
      console.log(error)
    })


})

app.get('/', (req, res) => {
  res.send('<h1>Kukkuu!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons.map(Person.format))
    })
})


app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      response.json(Person.format(person))
    })
    .catch(error => {
      console.log(error)
    })

})


app.delete('/api/persons/:id', (request, response) => {
  Person
    .findByIdAndDelete(request.params.id)
    .then(person => {
      response.json(Person.format(person))
    })
    .catch(error => {
      console.log(error)
    })

})

app.post('/api/persons', (request, response) => {
  const body = request.body

  Person
    .find( { name: body.name } )
    .then(res => {
      //console.log(res)
      if (typeof res !== 'undefined' && res.length > 0) {

        response.status(409).json({ error: 'name must be unique' })
      }
      else {

        const person = new Person({
          name: body.name,
          number: body.number
        })

        person
          .save()
          .then(savedPerson => {
            response.json(Person.format(savedPerson))

          })
          .catch(error => {
            console.log(error)

          })

      }

    })
    .catch(error => {
      console.log(error)
    })

})

app.put('/api/persons/:id', (req, res) => {
  const person = req.body

  Person
    .findByIdAndUpdate(req.params.id, person)
    .then(person => {
      res.json(Person.format(person))
    })
    .catch(error => {
      console.log(error)
    })

})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

