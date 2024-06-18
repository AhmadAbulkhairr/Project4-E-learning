const express = require('express');
const courseRouter = express.Router();
const {getAllCourses,createNewCourse,addCourseToUser,removeCourseFromUser,getAllCoursesByUserId} = require("../controllers/courses")



const authentication = require("../middleware/authen");
const authorization = require("../middleware/author");

courseRouter.get("/courses",getAllCourses)
courseRouter.post('/course',authentication, authorization('Teacher'),createNewCourse)
courseRouter.get('/addCourse/:id',authentication,addCourseToUser)
courseRouter.delete('/removeCourse/:id',authentication,removeCourseFromUser)
courseRouter.get("/coursesUser",authentication,getAllCoursesByUserId)



module.exports = courseRouter;
