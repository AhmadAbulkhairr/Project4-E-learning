const Teacher = require("../models/teacher");

const teacherRegister = (req, res) => {


    const {
        name,
email,
password,
phoneNumber,
age,
imageUrl,
    } = req.body


    
}









module.exports = {
    teacherRegister,
    getAllTeachers,
    getTeacher,
    updateTeacher,
    deleteTeacher,
  };