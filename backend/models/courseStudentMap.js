const mongoose = require('mongoose')

var CourseStudentMap = mongoose.model('CourseStudentMap',{
    courseId: {type: String},
    studentId: {type: String},
},'courseStudentMap')

module.exports  = {CourseStudentMap}
