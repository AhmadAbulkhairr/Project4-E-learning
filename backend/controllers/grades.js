const Grade = require("../models/GradesSchema");
const Subject = require("../models/SubjectSchema")
const Teacher = require("../models/TeacherSchema")

// Get all grades
const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find();
    res.status(200).json({
      success: true,
      grades,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Get all subjects by grade ID
/*const getSubjectsByGradeId = async (req, res) => {
  const { id } = req.params;

  try {
    const grade = await Grade.findById(id).populate('subject');
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found',
      });
    }
    res.status(200).json({
      success: true,
      subjects: grade.subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};*/

// Add a new grade
const addGrade = async (req, res) => {
  const { name } = req.body;
// i need to find a way to solve this subjectId issue 
  try {
    const grade = new Grade({
      name,
    });

    await grade.save();

    res.status(201).json({
      success: true,
      message: 'Grade added successfully',
      grade,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Update a grade by ID
const updateGrade = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const grade = await Grade.findByIdAndUpdate(id, updateData, { new: true });
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Grade updated successfully',
      grade,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Delete a grade by ID
const deleteGrade = async (req, res) => {
  const { id } = req.params;

  try {
    const subjects = await Subject.deleteMany({grade:id})
    const Teachers = await Subject.deleteMany({grade:id})

    const grade = await Grade.findByIdAndDelete(id);
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Grade deleted successfully',
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
  getAllGrades,
  
  addGrade,
  updateGrade,
  deleteGrade,
};
