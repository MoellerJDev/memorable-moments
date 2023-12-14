
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // In a real app, ensure this is hashed
  // Additional fields can be added as needed
});

module.exports = mongoose.model('User', userSchema);
