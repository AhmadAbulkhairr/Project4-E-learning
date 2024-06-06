// teacherRouter.js
const express = require('express');
const teacherRouter = express.Router();

const {
  teacherRegister,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
} = require('../controllers/teachers');

const authentication = require("../middleware/authen");
const authorization = require("../middleware/author");

teacherRouter.post("/register", authentication, authorization("Admin"), teacherRegister);
teacherRouter.get("/allTeachers", getAllTeachers);
teacherRouter.get("/Teacher/:id", getTeacher);
teacherRouter.put("/Teacher/:id", authentication, authorization("Admin"), updateTeacher);
teacherRouter.delete("/Teacher/:id", authentication, authorization("Admin"), deleteTeacher);

module.exports = teacherRouter;
