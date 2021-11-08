require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL,(err) => {
  if(!err){
  console.log("Mongodb connected")
  }else{
    console.log("error in connection",JSON.stringify(err,undefined,2))
  }
})
module.exports = mongoose
