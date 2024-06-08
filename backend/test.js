
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
//schemas

  const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name must be less than 50 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: [true, 'Role is required']
  },
  myCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

module.exports = mongoose.model('User', userSchema);


const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
    minlength: [3, 'Course name must be at least 3 characters long'],
    maxlength: [100, 'Course name must be less than 100 characters long']
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Subject is required']
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: [true, 'Teacher is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);


const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Material name is required'],
    trim: true,
    minlength: [3, 'Material name must be at least 3 characters long'],
    maxlength: [100, 'Material name must be less than 100 characters long']
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Subject is required']
  },
  grade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grade',
    required: [true, 'Grade is required']
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: [true, 'Teacher is required']
  },
  contentType: {
    type: String,
    enum: {
      values: ['video', 'document'],
      message: 'Content type must be either video or document'
    },
    required: [true, 'Content type is required']
  },
  contentUrl: {
    type: String,
    required: [true, 'Content URL is required'],
    match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, 'Please use a valid URL']
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Material', materialSchema);

const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subject name is required'],
    trim: true,
    minlength: [3, 'Subject name must be at least 3 characters long'],
    maxlength: [100, 'Subject name must be less than 100 characters long']
  },
  grade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grade',
    required: [true, 'Grade is required']
  },
  materials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material'
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subject', subjectSchema);

const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Grade name is required'],
    trim: true,
    minlength: [1, 'Grade name must be at least 1 character long'],
    maxlength: [50, 'Grade name must be less than 50 characters long']
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Grade', gradeSchema);


const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Subject is required']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [21, 'Age must be at least 21'],
    max: [100, 'Age must be less than 100']
  },
  materials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material'
  }],
  grades: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grade'
  }],
  imageUrl: {
    type: String,
    match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, 'Please use a valid URL']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review text is required'],
    trim: true,
    minlength: [3, 'Review text must be at least 3 characters long'],
    maxlength: [500, 'Review text must be less than 500 characters long']
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Reviewer is required']
  },
  reviewerName: {
    type: String,
    required: [true, 'Reviewer name is required']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);
