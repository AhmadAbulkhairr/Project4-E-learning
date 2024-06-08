//paid courses
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    grade: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade', required: true },

    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    price: { type: String , required:true}
  });
  
  module.exports = mongoose.model('Course', courseSchema);
  