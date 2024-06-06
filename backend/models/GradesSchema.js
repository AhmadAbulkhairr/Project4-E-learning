const mongoose = require("mongoose");

const gradeSchema  = new mongoose.Schema({
    name: { type: String, required: true },
    subject: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    created_at: { type: Date, default: Date.now }
  });
  
  module.exports  = mongoose.model('Grade', gradeSchema);
  