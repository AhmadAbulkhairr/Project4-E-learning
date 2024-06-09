const mongoose = require("mongoose");


const teacherSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phoneNumber: { type: String, required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' , required: true},

    age: { type: Number, required: true },
    imageUrl: { type: String } 
  });

  module.exports = mongoose.model('Teacher', teacherSchema);