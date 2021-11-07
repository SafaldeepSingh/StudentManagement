const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db.js');
const checkAuth= require("./middleware/checkAuth");
var studentsController = require('./controllers/studentsController')
var usersController = require('./controllers/usersController')
var coursesController = require('./controllers/coursesController')
var app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

app.listen(3000,()=>console.log('Server started at port-3000'))
app.use('/students',checkAuth,studentsController)
app.use('/users',usersController)
app.use('/courses',checkAuth,coursesController)

