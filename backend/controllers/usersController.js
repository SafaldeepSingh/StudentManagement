require('dotenv').config()

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
                    process.env.TOKEN_SECRET,
                    { expiresIn: process.env.TOKEN_EXPIRES_IN+"h"});
                res.status(200).json({status: "Success",token: token,expiresIn: process.env.TOKEN_EXPIRES_IN*3600 });
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

