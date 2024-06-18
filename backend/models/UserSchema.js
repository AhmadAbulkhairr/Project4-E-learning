const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
   },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
      type: String,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: [true, 'Role is required']
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function(v) {
          return /^(?:\+962|00962)?7[789]\d{7}$/.test(v);
        },
        message: props => `${props.value} is not a valid Jordanian phone number!`
      }
    },
    myCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }]
  },{ timestamps: true });

userSchema.pre("save", async function () {
    this.email = this.email.toLowerCase();
    if (this.isModified("password") && this.password) {
      this.password = await bcrypt.hash(this.password, 8);
  }
  });

module.exports = mongoose.model('User', userSchema);