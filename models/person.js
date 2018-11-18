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
  
module.exports = Person