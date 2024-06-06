//paid courses
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    teachers: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  });
  
  module.exports = mongoose.model('Course', classSchema);
  