const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    name: { type: String, required: true },/* 
    subject: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }], */
    created_at: { type: Date, default: Date.now }
  });
  
  module.exports  = mongoose.model('Class', classSchema);
  