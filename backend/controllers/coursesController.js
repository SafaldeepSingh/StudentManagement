const express = require('express')
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var {Course} = require('../models/course')
var {CourseStudentMap} = require('../models/courseStudentMap')
const {Student} = require("../models/student");

//Read
router.get('/list',(req,res) =>{
    Course.find((err,courses) => {
        if(!err){
            Student.find(((errorStudent, students) => {
                if(!errorStudent){
                    CourseStudentMap.find((error,courseStudentMap)=>{
                        if(!error){
                            var mapStudent = {}
                            var mapCourseStudent = {}
                            for(var i=0;i<students.length;i++){
                                var student = students[i]
                                mapStudent[student._id] = student;
                            }
                            for(var i=0;i<courseStudentMap.length;i++){
                                var csMap = courseStudentMap[i]
                                if(!mapCourseStudent.hasOwnProperty(csMap.courseId)){
                                    mapCourseStudent[csMap.courseId] = [];
                                }
                                mapCourseStudent[csMap.courseId].push(csMap.studentId);
                            }
                            res.status(200).json({
                                status:"Success",
                                courses: courses,
                                courseStudentMap: mapCourseStudent,
                                students:mapStudent,
                            });
                        }
                    });

                }
            }));
        }
        else{console.log("Error in reading Courses : "+JSON.stringify(err))}
    });
});

//Read specific
router.get('/:id',((req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400,`No record with given id: ${req.params.id}`)
    var course = new Course({
        name: req.body.name,
        start_date: req.body.start_date,
        duration: req.body.duration,
    });
    Course.findById(req.params.id, (err,doc) =>{
        if(!err){res.send(doc);}
        else{console.log('Error in Fetching Course: '+JSON.stringify(err))}
    });
}));

//Create
router.post('/',(req,res)=>{
    var course = new Course({
        name: req.body.name,
        start_date: req.body.start_date,
        duration: req.body.duration,
    });
    course.save((err,doc) =>{
        if(!err){res.status(200).json({
            status:"Success",
            course: doc
        })}
        else{console.log("Error in Creating Course  : "+JSON.stringify(err))}
    });
});

//Update
router.put('/:id',((req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400,`No record with given id: ${req.params.id}`)
    var course = {
        name: req.body.name,
        start_date: req.body.start_date,
        duration: req.body.duration,
    };
    Course.findByIdAndUpdate(req.params.id, course, {new: true}, (err,doc) =>{
        if(!err){res.status(200).json({
            status: "Success",
            course: doc
        });}
        else{console.log('Error in Updating Course: '+JSON.stringify(err))}
    });
}));

//Delete
router.delete("/:id",(req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400,`No record with given id: ${req.params.id}`)
    Course.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){res.status(200).json({
            status: "Success",
            course: doc
        });}
        else{console.log('Error in Deleting Course: '+JSON.stringify(err))}
    });
});


//Add Students to Course
router.post("/students",(req,res)=>{
    var studentIds = req.body.student_ids;
    for(let key in studentIds){
        var csMap = new CourseStudentMap({
            courseId: req.body.course_id,
            studentId: studentIds[key]
        });
        csMap.save((err,doc)=>{
            if(err){
                console.log("Error in Creating Student  : "+JSON.stringify(err));
            }
        })
    }
    res.status(200).json({
        status: "Success"
    });

});
//to delete student from course
router.post("/students/remove",((req, res) => {
    CourseStudentMap.findOneAndRemove({courseId: req.body.course_id,studentId: req.body.student_id},(err,doc)=>{
        if(!err){
            res.status(200).json({
                status: "Success",
                doc: doc
            });
        }else{
            console.log("error in removing student from course: "+JSON.stringify(err));
        }
    });
}))

module.exports = router
