
const usersModel = require("../models/UserSchema");
const Course = require ('../models/CoursesSchema')
const Teacher = require("../models/TeacherSchema")

const getAllCourses = async (req,res) => {

try {
    const courses = await Course.find().populate('teacher',"subject","grade")
    res.status(200).json({
        success: true,
        result: courses
    })
}
catch (err){
    res.status(500).json({
        success: false,
        message: 'Server Error',
        error: err.message
      });
}

}
const createNewCourse = async (req, res) => {
    const { name, price } = req.body;
    const teacher = req.token.userId;
  
    try {

            const teacher = await Teacher.findOne({ user: req.token.userId });
            if (!teacher) {
              return res.status(404).json({ success: false, message: 'teacher not found' });
            }
        
   
      const newCourse = new Course({
        name,
        teacher: teacher._id,
        price
      });

      


      const savedCourse = await newCourse.save();
      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        course: savedCourse
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: err.message
      });
    }
  };
  

  const addCourseToUser = async (req, res) => {
    const userId = req.token.userId;
    const { id} = req.params;
  
    try {
      const user = await usersModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
  
      if (!user.myCourses.includes(id)) {
        user.myCourses.push(id);
        await user.save();
        res.status(200).json({
          success: true,
          message: 'Course added to user',
          user
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Course already added to user'
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: err.message
      });
    }
  };
  
  const removeCourseFromUser = async (req,res)=> {
    const userId = req.token.usersId
    const {id} = req.params

    try {
        const user = await usersModel.findById(userId)
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
              });
        }

        const indexId = user.myCourses.indexOf(id);
        if (indexId !== -1 ){
        user.myCourses.splice(indexId,1)
      await user.save()
      res.status(200).json({
        success: true,
        message: 'Course removed from user',
        user
      });
    }
      else {
        res.status(400).json({
          success: false,
          message: 'Course not found in user courses'
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: err.message
      });
    }
  
  }

  const getAllCoursesByUserId = async (req,res) => {
    const {id} = req.token.userId;

    try {
const courses = await Course.findById(id).populate('teacher',"subject","grade")
if (!courses){
    return res.status(404).json({
        success: false,
        message: 'courses not found'
      });
}
res.status(200).json({
    success: true,
    result: courses
})


    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
          });
    }



  }




module.exports = {getAllCourses,createNewCourse,addCourseToUser,removeCourseFromUser,getAllCoursesByUserId}