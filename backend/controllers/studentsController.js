const express = require('express')
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var {Student} = require('../models/student')
const {CourseStudentMap} = require("../models/courseStudentMap");

//Read
router.get('/list',(req,res) =>{
  Student.find((err,docs) => {
    if(!err){res.status(200).json({
      status:"success",
      students: docs
    });}
    else{console.log("Error in reading Students : "+JSON.stringify(err))}
  });
})

//Read specific
router.get('/:id',((req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400,`No record with given id: ${req.params.id}`)
  var student = new Student({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    dob: req.body.dob,
  });
  Student.findById(req.params.id, (err,doc) =>{
    if(!err){res.send(doc);}
    else{console.log('Error in Fetching Student: '+JSON.stringify(err))}
  });
}));

//Create
router.post('/',(req,res)=>{
  var student = new Student({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    dob: req.body.dob,
  });
  student.save((err,doc) =>{
    if(!err){res.status(200).json({
      student: doc,
      status: "Success"
    })}
    else{console.log("Error in Creating Student  : "+JSON.stringify(err))}
  });
});

//Update
router.put('/:id',((req, res) => {
  if(!ObjectId.isValid(req.params.id))
      return res.status(400,`No record with given id: ${req.params.id}`)
  var student = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    dob: req.body.dob,
  };
  Student.findByIdAndUpdate(req.params.id, student, {new: true}, (err,doc) =>{
    if(!err){res.status(200).json({
      status:"Success",
      student: doc
    });}
    else{console.log('Error in Updating Student: '+JSON.stringify(err))}
  });
}));

//Delete
router.delete("/:id",(req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400,`No record with given id: ${req.params.id}`)
  //Delete All Students Mappings with Course
  CourseStudentMap.findOneAndRemove({studentId: req.params.id},(error,doc)=>{
    if(!error){
      Student.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){res.status(200).json({
          status:  "Success",
          student: doc
        });}
        else{console.log('Error in Deleting Student: '+JSON.stringify(err))}
      });
    }else{
      console.log("Error remove students mapping with course: "+JSON.stringify(error))
    }
  });
});

module.exports = router
