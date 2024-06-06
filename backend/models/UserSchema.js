const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
        created_at: { type: Date, default: Date.now }

})
module.exports = mongoose.model('Teacher', userSchema);