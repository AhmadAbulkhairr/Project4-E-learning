const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema ({
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
        created_at: { type: Date, default: Date.now }

})


userSchema.pre("save", async function () {
    this.email = this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password, 8);
  });

module.exports = mongoose.model('User', userSchema);