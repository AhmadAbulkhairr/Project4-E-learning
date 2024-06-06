const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role: { type: String, required: true },
});
const Role = mongoose.model('Role', roleSchema);

module.exports = Role

const Roles = [
    { name: 'Admin' },
    { name: 'Teacher' },
    { name: 'Student' },
  ];
  
  Role.insertMany(Roles)
    .then(() => {
      console.log('Roles added successfully');
    })
    .catch((err) => {
      console.error('Error adding Roles', err);
    });

