/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
const secret = require('./auth-secret.js');

const authenticator = (req, res, next) => {
  const token = req.headers.authorization;

  token
    ?  jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
        error
          ? res.status(401).json({ you: 'shall not pass!' })
          : req.decodedToken = decodedToken && next();
      })
    : res.status(401).json({ you: 'can\'t touch this!' });
};

const generator = function genToken(user) {
   const payload = {
     userid: user.id,
     username: user.username,
   };
   const options = { expiresIn: '1h' };
   const token = jwt.sign(payload, secret.jwtSecret, options);

   return token;
 }

module.exports = {
  authenticator,
  generator
}
