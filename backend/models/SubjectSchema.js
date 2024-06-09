const mongoose = require("mongoose");


const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    grade: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade', required: true },
    created_at: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Subject', subjectSchema);
  