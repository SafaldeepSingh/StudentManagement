const mongoose = require('mongoose')

var Student = mongoose.model('Student',{
  firstName: {type: String},
  lastName: {type: String},
  dob: {type: Date},
},'students')

module.exports  = {Student}
