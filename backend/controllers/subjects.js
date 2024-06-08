const Subject = require('../models/SubjectSchema');
const Grade = require('../models/GradesSchema');
//find a way to update the array in grade too

// Get all subjects
//mesh moheeem
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate('grade');
    res.status(200).json({
      success: true,
      subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Get subjects by grade ID
const getSubjectsByGradeId = async (req, res) => {
  const { gradeId } = req.params;
  try {
    const subjects = await Grade.findById(gradeId).populate('subject');
    if (!subjects.length) {
      return res.status(404).json({
        success: false,
        message: 'No subjects found for this grade',
      });
    }
    res.status(200).json({
      success: true,
      subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Add a new subject

const addSubject = async (req, res) => {
    const { name, gradeName } = req.body;
  
    try {
      // Find the grade by name
      const grade = await Grade.findOne({ name: gradeName });
      if (!grade) {
        return res.status(404).json({
          success: false,
          message: 'Grade not found',
        });
      }
  
      // Create new subject
      const newSubject = new Subject({
        name,
        grade: grade._id,
      });
  
      // Save the new subject
      const savedSubject = await newSubject.save();
  
      // Update the grade's subjects array
      grade.subject.push(savedSubject._id);
      await grade.save();
  
      res.status(201).json({
        success: true,
        message: 'Subject added successfully',
        subject: savedSubject,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: err.message,
      });
    }
  };

// Update a subject by ID

//most likely i will not use it 
const updateSubject = async (req, res) => {
    const { id } = req.params;
    const { name, gradeName } = req.body;
  
    try {
      const subject = await Subject.findById(id);
  
      if (!subject) {
        return res.status(404).json({
          success: false,
          message: 'Subject not found',
        });
      }
  
      if (gradeName) {
        const newGrade = await Grade.findOne({ name: gradeName });
        if (!newGrade) {
          return res.status(404).json({
            success: false,
            message: 'Grade not found',
          });
        }
  
        // If the grade has changed, update the grade references
        if (!subject.grade.equals(newGrade._id)) {
          const oldGrade = await Grade.findById(subject.grade);
          if (oldGrade) {
            // Remove the subject from the old grade's subjects array
            const oldIndex = oldGrade.subjects.indexOf(subject._id);
            if (oldIndex > -1) {
              oldGrade.subjects.splice(oldIndex, 1);
              await oldGrade.save();
            }
          }
  
          // Add the subject to the new grade's subjects array
          newGrade.subjects.push(subject._id);
          await newGrade.save();
  
          // Update the subject's grade
          subject.grade = newGrade._id;
        }
      }
  
      // Update the subject's name if provided
      if (name) {
        subject.name = name;
      }
  
      await subject.save();
  
      res.status(200).json({
        success: true,
        message: 'Subject updated successfully',
        subject,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  };
  
  module.exports = { updateSubject };
  
const deleteSubject = async (req, res) => {
    const { id } = req.params;
  
    try {
      const subject = await Subject.findById(id);
  
      if (!subject) {
        return res.status(404).json({
          success: false,
          message: 'Subject not found',
        });
      }
  
      const grade = await Grade.findById(subject.grade);
  
      if (grade) {
        const index = grade.subject.indexOf(id);
        if (index > -1) {
          grade.subject.splice(index, 1);
          await grade.save();
        }
      }
  
      await Subject.findByIdAndDelete(id);
  
      res.status(200).json({
        success: true,
        message: 'Subject deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  };
  


module.exports = {
  getAllSubjects,
  getSubjectsByGradeId,
  getAllMaterialsBySubjectId,
  addSubject,
  updateSubject,
  deleteSubject,
};
