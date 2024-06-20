const Material = require('../models/MaterialSchema');

const Teacher = require("../models/TeacherSchema");
const cloudinary = require('../cloudinaryConfig');




const addMaterial = async (req, res) => {
    const { name, contentType } = req.body;
  
    try {
      const teacher = await Teacher.findOne({ user: req.token.userId });
      if (!teacher) {
        return res.status(404).json({ success: false, message: 'teacher not found' });
      }
  console.log(req.files.file);
  let contentUrl = null;
  if (req.files && req.files.file) {
    const result = await cloudinary.uploader.upload(req.files.file.path, {
      resource_type: contentType === 'video' ? 'video' : 'auto',
      folder: 'material_files',
    });
    contentUrl = result.secure_url;
  }

      const material = new Material({
        name,
        teacher: teacher._id,
        contentType,
        contentUrl
      });
  
      await material.save();
  
  
  
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


    res.status(200).json({ success: true, message: 'Material deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

const getAllMaterialsByTeacherId = async (req,res) => {
    const {id} = req.params

    try {
        const allMaterials = await Material.find({teacher: id}).populate({
          path: 'teacher',
          populate: [
              { path: 'user', select: 'name' },
              { path: 'grade', select: 'name' },
              { path: 'subject', select: 'name' }
          ]
      });

        
    if(!allMaterials){
        return res.status(404).json({
            success: false,
            message: "Teachers not found"
        })
    }
    res.status(200).json({
        success:true,
        allMaterials
    })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
          });
    }
}


module.exports = {
  addMaterial,
  updateMaterial,
  deleteMaterial,
  getAllMaterialsByTeacherId
};
