const Subject = require('../models/SubjectSchema');
const Grade = require('../models/GradesSchema');
//find a way to update the array in grade too

// Get all subjects
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
/*const getSubjectsByGradeId = async (req, res) => {
  const { gradeId } = req.params;
  try {
    const subjects = await Subject.find({ grade: gradeId }).populate('grade');
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
};*/

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
      grade.subjects.push(savedSubject._id);
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
  const { name, gradeId, materialIds } = req.body;

  /*if (!mongoose.Types.ObjectId.isValid(gradeId) || !Array.isArray(materialIds) || !materialIds.every(id => mongoose.Types.ObjectId.isValid(id))) {
    return res.status(400).json({
      success: false,
      message: 'Invalid grade ID or material IDs',
    });
  }*/

  try {
    const grade = await Grade.findById(gradeId);
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found',
      });
    }

    const subject = await Subject.findByIdAndUpdate(id, { name, grade: gradeId, materials: materialIds }, { new: true });

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found',
      });
    }

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

// Delete a subject by ID
const deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found',
      });
    }

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

const getAllMaterialsBySubjectId = async (req,res) => {
   
        const { id } = req.params;
      
        try {
          const subject = await Subject.findById(id).populate('materials');
          if (!subject) {
            return res.status(404).json({
              success: false,
              message: 'subject not found',
            });
          }
          res.status(200).json({
            success: true,
            materials: subject.materials,
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
  //getSubjectsByGradeId,
  getAllMaterialsBySubjectId,
  addSubject,
  updateSubject,
  deleteSubject,
};
