const express = require('express');
const subjectRouter = express.Router();

const {
  getAllSubjects,
  getSubjectsByGradeId,
  addSubject,
  updateSubject,
  deleteSubject,
} = require('../controllers/subjects');

const authentication = require('../middleware/authen');
const authorization = require('../middleware/author');

//subjectRouter.get('/allSubjects', getAllSubjects);
subjectRouter.get('/grade/:gradeId/subjects', getSubjectsByGradeId);

subjectRouter.post('/addSubject', authentication, authorization('Admin'), addSubject);
subjectRouter.put('/updateSubject/:id', authentication, authorization('Admin'), updateSubject);
subjectRouter.delete('/deleteSubject/:id', authentication, authorization('Admin'), deleteSubject);

module.exports = subjectRouter;
