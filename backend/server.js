const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection setup (placeholder)
mongoose.connect('mongodb://localhost/memorable-moments', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Memorable Moments API');
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;