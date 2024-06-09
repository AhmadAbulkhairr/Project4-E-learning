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
    const subjects = await Subject.find({grade:gradeId}).populate("grade");
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
    const { name, gradeId } = req.body;
  
    try {
      // Find the grade by name
      
      // Create new subject
      const newSubject = new Subject({
        name,
        grade: gradeId,
      });
  
      // Save the new subject
      const savedSubject = await newSubject.save();
  
      
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
    const { name, gradeId } = req.body;
  
    try {
      const subject = await Subject.findById(id);
  
      if (!subject) {
        return res.status(404).json({
          success: false,
          message: 'Subject not found',
        });
      }
  
      // Update the subject's grade if provided
      if (gradeId) {
        const newGrade = await Grade.findById(gradeId);
        if (!newGrade) {
          return res.status(404).json({
            success: false,
            message: 'Grade not found',
          });
        }
  
        // Update the subject's grade
        subject.grade = newGrade._id;
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
  addSubject,
  updateSubject,
  deleteSubject,
};
