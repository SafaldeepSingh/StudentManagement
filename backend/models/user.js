const mongoose = require('mongoose')

var User = mongoose.model('User',{
    email: {type: String},
    password: {type: String},
},'users')

module.exports  = {User}
