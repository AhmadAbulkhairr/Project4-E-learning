const express = require('express');
const gradeRouter = express.Router();

const {
  getAllGrades,
  getSubjectsByGradeId,
  addGrade,
  updateGrade,
  deleteGrade,
} = require('../controllers/grades');

const authentication = require("../middleware/authen");
const authorization = require("../middleware/author");

gradeRouter.get("/allGrades", getAllGrades);
gradeRouter.get("/subjects/:id", getSubjectsByGradeId);
gradeRouter.post("/addGrade", authentication, authorization("Admin"), addGrade);
gradeRouter.put("/updateGrade/:id", authentication, authorization("Admin"), updateGrade);
gradeRouter.delete("/deleteGrade/:id", authentication, authorization("Admin"), deleteGrade);

module.exports = gradeRouter;
