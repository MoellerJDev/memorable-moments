const admin = require('firebase-admin');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  admin
    .auth()
    .verifyIdToken(token)
    .then(function(decodedToken) {
      req.user = decodedToken;
      next();
    })
    .catch(function(error) {
      res.status(401).send('Unauthorized');
    });
};
