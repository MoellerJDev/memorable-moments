const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  authMiddleware: (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: 'Authentication token not provided' });
    }

    try {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid authentication token' });
    }
  }
};


