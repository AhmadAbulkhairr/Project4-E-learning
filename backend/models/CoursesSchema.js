//paid courses
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    price: { type: String , required:true}
  },{ timestamps: true });
  
  module.exports = mongoose.model('Course', courseSchema);
  