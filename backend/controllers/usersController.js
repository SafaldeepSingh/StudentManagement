const express = require('express')
var router = express.Router();
var jwt = require('jsonwebtoken');

var {User} = require('../models/user')
const {Student} = require("../models/student");

//Check Credentials
router.post('/',(req,res)=> {
    User.findOne({email: req.body.email,password: req.body.password}, (err, doc) =>{
        if(!err){
            if(doc){
                const token=jwt.sign({email: doc.email, userId: doc._id},
                    'RP.yw2uc6bLQTquClFdeeiFWw.BEj8DBP2JEQXgTFtz9AF1gxzbmEn5bbEYwe3vwnM0OM',
                    { expiresIn: "1h"});
                res.status(200).json({status: "Success",token: token,expiresIn: 3600 });
            }else{
                res.json({ status: "failed",message:"Auth Failed"});
            }
        }else{
            res.json({status: "failed",message:"Contact Admin"});
            console.log('Error in Fetching User: '+JSON.stringify(err))
        }
    });
});
module.exports = router

