const express = require('express');
const courseRouter = express.Router();
const {getAllCourses,createNewCourse,addCourseToUser,removeCourseFromUser} = require("../controllers/courses")



const authentication = require("../middleware/authen");
const authorization = require("../middleware/author");

courseRouter.get("/courser",getAllCourses)
courseRouter.post('/course',authentication, authorization('Teacher'),createNewCourse)
courseRouter.put('/addCourse/:id',authentication,addCourseToUser)
courseRouter.put('/removeCourse/:id',authentication,removeCourseFromUser)



module.exports = courseRouter;
