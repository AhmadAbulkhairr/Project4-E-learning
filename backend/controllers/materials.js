const Material = require('../models/MaterialSchema');

const Subject = require('../models/SubjectSchema');
const Grade = require('../models/GradesSchema');
const Teacher = require("../models/TeacherSchema");
const addMaterial = async (req, res) => {
    const { name, subjectName, gradeName, teacherName, contentType, contentUrl } = req.body;
  
    try {
      const subject = await Subject.findOne({ name: subjectName });
      if (!subject) {
        return res.status(404).json({ success: false, message: 'Subject not found' });
      }
  
      const grade = await Grade.findOne({ name: gradeName });
      if (!grade) {
        return res.status(404).json({ success: false, message: 'Grade not found' });
      }
  
      const teacher = await Teacher.findOne({ name: teacherName });
      if (!teacher) {
        return res.status(404).json({ success: false, message: 'Teacher not found' });
      }
  
      const material = new Material({
        name,
        subject: subject._id,
        grade: grade._id,
        teacher: teacher._id,
        contentType,
        contentUrl
      });
  
      await material.save();
  
      subject.materials.push(material._id);
      teacher.materials.push(material._id);
  
      await subject.save();
      await teacher.save();
  
      res.status(201).json({
        success: true,
        message: 'Material created successfully',
        material
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
  };
  
  module.exports = { addMaterial };
  
const getAllMaterialsBySubjectId = async (req, res) => {
    const { id } = req.params;
    const { teacherName, contentType, page = 1, limit = 5 } = req.query;
  
    try {
      const subject = await Subject.findById(id);
      if (!subject) {
        return res.status(404).json({
          success: false,
          message: 'Subject not found',
        });
      }
  
      let query = { subject: id };
  
      if (teacherName) {
        const teachers = await Teacher.find({ name: new RegExp(teacherName, 'i') });
        if (teachers.length > 0) {
          const teacherIds = teachers.map(teacher => teacher._id);
          query.teacher = { $in: teacherIds };
        } else {
          return res.status(404).json({
            success: false,
            message: 'No materials found for the specified teacher',
          });
        }
      }
  
      if (contentType) {
        query.contentType = contentType;
      }
  
      const skip = (page - 1) * limit;
  
      const materials = await Material.find(query)
        .populate('teacher', 'name')
        .populate('subject', 'name')
        .populate('grade', 'name')
        .skip(skip)
        .limit(Number(limit));
  
      const totalCount = await Material.countDocuments(query);
  
      res.status(200).json({
        success: true,
        materials,
        pagination: {
          totalItems: totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page,
          itemsPerPage: limit,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  };
  
/*const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find()
      .populate('subject', 'name')
      .populate('grade', 'name')
      .populate('teacher', 'user', 'name');

    res.status(200).json({ success: true, materials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

const getMaterialById = async (req, res) => {
  const { id } = req.params;

  try {
    const material = await Material.findById(id)
      .populate('subject', 'name')
      .populate('grade', 'name')
      .populate('teacher', 'user', 'name')
      .populate('reviews');

    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }

    res.status(200).json({ success: true, material });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};*/

const updateMaterial = async (req, res) => {
  const { id } = req.params;
  const { name, contentType, contentUrl } = req.body;

  try {
    const material = await Material.findByIdAndUpdate(
      id,
      { name, contentType, contentUrl },
      { new: true }
    );

    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }

    res.status(200).json({ success: true, message: 'Material updated successfully', material });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

const deleteMaterial = async (req, res) => {
  const { id } = req.params;

  try {
    const material = await Material.findByIdAndDelete(id);

    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }

    await Subject.updateOne({ _id: material.subject }, { $pull: { materials: material._id } });
    await Teacher.updateOne({ _id: material.teacher }, { $pull: { materials: material._id } });

    res.status(200).json({ success: true, message: 'Material deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

module.exports = {
  addMaterial,
  //getAllMaterials,
 // getMaterialById,
 getAllMaterialsBySubjectId,
  updateMaterial,
  deleteMaterial,
};
