const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://safaldeepsingh76:Uv1Ac6iJI44XWfqr@studentapp.jpxst.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',(err) => {
  if(!err){
  console.log("Mongodb connected")
  }else{
    console.log("error in connection",JSON.stringify(err,undefined,2))
  }
})
module.exports = mongoose
