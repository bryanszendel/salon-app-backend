const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  const { username, password } = req.headers

  const secret = secrets.jwtSecret

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Credentials are invalid.' });
      } else {
        req.user = { username: decodedToken.username }
        next()
      }
    })
  } else {
    res.status(400).json({ message: 'No credentials provided' })
  }
};