/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
const secret = require('./auth-secret.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  token
    ?  jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
        token
          ? res.status(401).json({ you: 'shall not pass!' })
          : req.decodedToken = decodedToken && next();
      })
    : res.status(401).json({ you: 'can\'t touch this!' });
};
