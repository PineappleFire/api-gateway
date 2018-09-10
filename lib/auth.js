const jwt = require('jsonwebtoken');
const superSecretKey = 'SuperDuperSecret';

function generateAuthToken(id, expTime = '24h') {
  return new Promise((resolve, reject) => {
    const payload = { sub: id };
    jwt.sign(payload, superSecretKey, { expiresIn: expTime }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

function requireAuthentication(req, res, next) {
  const authHeader = req.get('Authorization') || '';
  const authHeaderParts = authHeader.split(' ');
  const token = authHeaderParts[0] === 'Bearer' ? authHeaderParts[1] : null;
  jwt.verify(token, superSecretKey, (err, payload) => {
    if (!err) {
      req.userId = payload.sub;
      next();
    } else {
      res.status(401).json({
        error: "Invalid authentication token."
      });
    }
  });
}

exports.generateAuthToken = generateAuthToken;
exports.requireAuthentication = requireAuthentication;
