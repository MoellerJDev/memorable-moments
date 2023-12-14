const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  // Additional fields can be added as needed
});

module.exports = mongoose.model('Memory', memorySchema);