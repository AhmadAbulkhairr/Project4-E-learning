const mongoose = require("mongoose");


const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    grade: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade', required: true }
  },{ timestamps: true });
  
  module.exports = mongoose.model('Subject', subjectSchema);
  