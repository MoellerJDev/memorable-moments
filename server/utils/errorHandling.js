const { AuthenticationError, ValidationError } = require('../schemas/errors');

const errorHandlingMiddleware = (err, req, res, next) => {
  if (err instanceof AuthenticationError) {
    res.status(401).json({ message: err.message });
  } else if (err instanceof ValidationError) {
    res.status(400).json({ message: err.message, errors: err.errors });
  } else {
    // Handle other types of errors
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = errorHandlingMiddleware;
