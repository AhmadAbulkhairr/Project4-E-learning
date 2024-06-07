// teacherRouter.js
const express = require('express');
const teacherRouter = express.Router();

const {
  teacherRegister,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,getTeacherByUserId
} = require('../controllers/teachers');

const authentication = require("../middleware/authen");
const authorization = require("../middleware/author");

teacherRouter.post("/register", authentication, authorization("Admin"), teacherRegister);
teacherRouter.get("/allTeachers", getAllTeachers);
teacherRouter.get("/Teacher/:id", getTeacher);
teacherRouter.put("/Teacher/:id", authentication, authorization("Admin"), updateTeacher);
teacherRouter.delete("/Teacher/:id", authentication, authorization("Admin"), deleteTeacher);
teacherRouter.get("/Teacher",authentication,authorization("Teacher"),getTeacherByUserId)

/* 

teacherRouter.put("/Teacher/:id/subjects", authentication, authorization("Admin"), assignSubjectsToTeacher);

teacherRouter.put("/Teacher/:id/grades", authentication, authorization("Admin"), assignGradesToTeacher);

teacherRouter.put("/Teacher/:id/materials", authentication, authorization("Admin"), assignMaterialsToTeacher);

teacherRouter.put("/Teacher/:id/profile-picture", authentication, authorization("Admin"), 

updateProfilePicture);
teacherRouter.get("/subject/:subjectId", getTeachersBySubject);

teacherRouter.get("/grade/:gradeId", getTeachersByGrade);

*/

module.exports = teacherRouter;
