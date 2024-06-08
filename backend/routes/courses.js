const express = require('express');
const courseRouter = express.Router();
const {getAllCourses,createNewCourse,addCourseToUser,removeCourseToUser} = require("../controllers/courses")



const authentication = require("../middleware/authen");
const authorization = require("../middleware/author");

courseRouter.get("/courser",getAllCourses)
courseRouter.post('/course',authentication, authorization('Teacher'),createNewCourse)
courseRouter.put('/addCourse/:id',authentication,addCourseToUser)
courseRouter.put('/removeCourse/:id',authentication,removeCourseToUser)



module.exports = courseRouter;
