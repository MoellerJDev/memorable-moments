const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/memorable_moments';

// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/memorable_moments', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', function () {
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function (error) {
  console.log('Mongoose Connection Error : ' + error);
});
module.exports = mongoose.connection
