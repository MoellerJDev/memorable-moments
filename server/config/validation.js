const { validationResult } = require('express-validator');
const { ValidationError } = require('./errors');

const validateInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array());
  }
  next();
};

module.exports = {
  validateInputs,
};
