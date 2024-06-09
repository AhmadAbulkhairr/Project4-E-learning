const Material = require('../models/MaterialSchema');

const Teacher = require("../models/TeacherSchema");




const addMaterial = async (req, res) => {
    const { name, subjectId, teacherID, contentType, contentUrl,img } = req.body;
  
    try {
      const teacher = await Teacher.findOne({ user: req.token.userId });
      if (!teacher) {
        return res.status(404).json({ success: false, message: 'teacher not found' });
      }
  
  


      const material = new Material({
        name,
        subjectId,
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
        const allMaterials = await Material.find({teacher: id}).populate('teacher',"-_id -__v","subject","user","grade")

        
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
