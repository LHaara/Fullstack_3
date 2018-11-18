const mongoose = require('mongoose')

const url = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@ds063769.mlab.com:63769/kovisten_puhelinnumerot'

mongoose.connect(url, { useNewUrlParser: true })

const Person = mongoose.model('Person', {
    name: String,
    number: String
  })
  
module.exports = Person