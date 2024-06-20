const express = require('express');
const courseRouter = express.Router();
const {getAllCourses,createNewCourse,getCourseByID,addCourseToUser,removeCourseFromUser,getAllCoursesByUserId} = require("../controllers/courses")
const {createNewReview} = require("../controllers/review")



const authentication = require("../middleware/authen");
const authorization = require("../middleware/author");

courseRouter.get("/courses",getAllCourses)
courseRouter.post('/course',authentication, authorization('Teacher'),createNewCourse)
courseRouter.get('/addCourse/:id',authentication,addCourseToUser)
courseRouter.delete('/removeCourse/:id',authentication,removeCourseFromUser)
courseRouter.get("/coursesUser",authentication,getAllCoursesByUserId)

courseRouter.get("/course/:id",getCourseByID)
courseRouter.post("/review/:id",authentication,createNewReview)


module.exports = courseRouter;
