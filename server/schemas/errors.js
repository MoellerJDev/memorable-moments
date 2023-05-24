class AuthenticationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AuthenticationError';
    }
  }
  
  class ValidationError extends Error {
    constructor(errors) {
      super('Validation error');
      this.name = 'ValidationError';
      this.errors = errors;
    }
  }
  
  module.exports = {
    AuthenticationError,
    ValidationError,
  };
  