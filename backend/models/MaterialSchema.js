
const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    contentType: { type: String, enum: ['video', 'document'], required: true },
    contentUrl: { type: String, required: true },
  },{ timestamps: true });
  
  module.exports  = mongoose.model('Material', materialSchema);
  