
//for materials 

const getAllMaterials = async (req, res) => {
    try {
      // Pagination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      // Filtering
      const { subjectId, gradeId, teacherId, contentType } = req.query;
      const filter = {};
  
      if (subjectId) filter.subject = subjectId;
      if (gradeId) filter.grade = gradeId;
      if (teacherId) filter.teacher = teacherId;
      if (contentType) filter.contentType = contentType;
  
      // Find materials with pagination and filtering
      const materials = await Material.find(filter)
        .populate('subject', 'name')
        .populate('grade', 'name')
        .populate('teacher', 'user', 'name')
        .skip(skip)
        .limit(limit);
  
      // Get total count for pagination
      const totalMaterials = await Material.countDocuments(filter);
      const totalPages = Math.ceil(totalMaterials / limit);
  
      res.status(200).json({
        success: true,
        page,
        totalPages,
        totalMaterials,
        materials
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  };



  //To filter materials by a specific subject and get the second page:
  //GET /allMaterials?subjectId=subject_id_here&page=2&limit=5
//GET /allMaterials?page=1&limit=5
// To get the first page of materials with a limit of 5 per page:

//materials names instead of ids
/* const getAllMaterials = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filtering
    const { subjectName, gradeName, teacherName, contentType } = req.query;
    const filter = {};

    if (subjectName) {
      const subject = await Subject.findOne({ name: subjectName });
      if (subject) {
        filter.subject = subject._id;
      } else {
        return res.status(404).json({
          success: false,
          message: 'Subject not found',
        });
      }
    }

    if (gradeName) {
      const grade = await Grade.findOne({ name: gradeName });
      if (grade) {
        filter.grade = grade._id;
      } else {
        return res.status(404).json({
          success: false,
          message: 'Grade not found',
        });
      }
    }

    if (teacherName) {
      const user = await User.findOne({ name: teacherName });
      const teacher = await Teacher.findOne({ user: user._id });
      if (teacher) {
        filter.teacher = teacher._id;
      } else {
        return res.status(404).json({
          success: false,
          message: 'Teacher not found',
        });
      }
    }

    if (contentType) filter.contentType = contentType;

    const materials = await Material.find(filter)
      .populate('subject', 'name')
      .populate('grade', 'name')
      .populate('teacher', 'user', 'name')
      .skip(skip)
      .limit(limit);

    const totalMaterials = await Material.countDocuments(filter);
    const totalPages = Math.ceil(totalMaterials / limit);

    res.status(200).json({
      success: true,
      page,
      totalPages,
      totalMaterials,
      materials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
 */

const Material = require('../models/Material');
const Subject = require('../models/Subject');
const Grade = require('../models/Grade');
const Teacher = require('../models/Teacher');

// Add Material
const addMaterial = async (req, res) => {
  try {
    const { name, subjectName, gradeName, teacherName, contentType, contentUrl } = req.body;

    const subject = await Subject.findOne({ name: subjectName });
    const grade = await Grade.findOne({ name: gradeName });
    const user = await User.findOne({ name: teacherName });
    const teacher = await Teacher.findOne({ user: user._id });

    if (!subject || !grade || !teacher) {
      return res.status(404).json({
        success: false,
        message: 'Subject, Grade, or Teacher not found',
      });
    }

    const material = new Material({
      name,
      subject: subject._id,
      grade: grade._id,
      teacher: teacher._id,
      contentType,
      contentUrl,
    });

    await material.save();

    subject.materials.push(material._id);
    await subject.save();

    res.status(201).json({
      success: true,
      message: 'Material added successfully',
      material,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Get All Materials with Pagination and Filtering
const getAllMaterials = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filtering
    const { subjectName, gradeName, teacherName, contentType } = req.query;
    const filter = {};

    if (subjectName) {
      const subject = await Subject.findOne({ name: subjectName });
      if (subject) {
        filter.subject = subject._id;
      } else {
        return res.status(404).json({
          success: false,
          message: 'Subject not found',
        });
      }
    }

    if (gradeName) {
      const grade = await Grade.findOne({ name: gradeName });
      if (grade) {
        filter.grade = grade._id;
      } else {
        return res.status(404).json({
          success: false,
          message: 'Grade not found',
        });
      }
    }

    if (teacherName) {
      const user = await User.findOne({ name: teacherName });
      const teacher = await Teacher.findOne({ user: user._id });
      if (teacher) {
        filter.teacher = teacher._id;
      } else {
        return res.status(404).json({
          success: false,
          message: 'Teacher not found',
        });
      }
    }

    if (contentType) filter.contentType = contentType;

    const materials = await Material.find(filter)
      .populate('subject', 'name')
      .populate('grade', 'name')
      .populate('teacher', 'user', 'name')
      .skip(skip)
      .limit(limit);

    const totalMaterials = await Material.countDocuments(filter);
    const totalPages = Math.ceil(totalMaterials / limit);

    res.status(200).json({
      success: true,
      page,
      totalPages,
      totalMaterials,
      materials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Get Material by ID
const getMaterialById = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.findById(id)
      .populate('subject', 'name')
      .populate('grade', 'name')
      .populate('teacher', 'user', 'name');

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found',
      });
    }

    res.status(200).json({
      success: true,
      material,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Update Material
const updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subjectName, gradeName, teacherName, contentType, contentUrl } = req.body;

    const subject = await Subject.findOne({ name: subjectName });
    const grade = await Grade.findOne({ name: gradeName });
    const user = await User.findOne({ name: teacherName });
    const teacher = await Teacher.findOne({ user: user._id });

    if (!subject || !grade || !teacher) {
      return res.status(404).json({
        success: false,
        message: 'Subject, Grade, or Teacher not found',
      });
    }

    const material = await Material.findByIdAndUpdate(
      id,
      {
        name,
        subject: subject._id,
        grade: grade._id,
        teacher: teacher._id,
        contentType,
        contentUrl,
      },
      { new: true }
    );

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Material updated successfully',
      material,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Delete Material
const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.findByIdAndDelete(id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Material deleted successfully',
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
  addMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
};


const response = await axios.get(`/api/subject/${subjectId}/materials`, {
    params: {
      teacherName: filters.teacherName, // Optional filter by teacher name
      contentType: filters.contentType, // Optional filter by content type (e.g., 'video' or 'document')
      page, // Pagination: which page to fetch
      limit, // Pagination: number of items per page
    },
    headers: {
      // Include the authentication token in the headers
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });