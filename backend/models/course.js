const mongoose = require('mongoose')

var Course = mongoose.model('Course',{
    name: {type: String},
    start_date: {type: Date},
    duration: {type: Number},
},'courses')

module.exports  = {Course}
