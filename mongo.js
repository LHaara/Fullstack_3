const mongoose = require('mongoose')

const url = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@ds063769.mlab.com:63769/kovisten_puhelinnumerot'
mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
personSchema.statics.format = function (person){
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const Person = mongoose.model('Person', personSchema)


// jos edes numero puuttuu argumenteista, listataan tiedot
if (process.argv[3] === undefined){

    console.log('puhelinluettelo:')

    Person
    .find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(person.name, person.number)
        //console.log(Person.format(person))
      })
      mongoose.connection.close()
    })

}
else{

    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
      })
     
      person
      .save()
      .then(response => {
        console.log('lisätään henkilö ',person.name,' numero ',person.number,' luetteloon')
        mongoose.connection.close()
      })

}

