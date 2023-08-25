const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const NotAuthorizedError = require('../errors/NotAuthorizedError');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new NotAuthorizedError('Authorization Required');
    }

    const token = authorization.replace('Bearer ', '');

    const payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
      {
        expiresIn: '7d',
      },
    );

    if (!payload) {
      throw new NotAuthorizedError('Authorization Required');
    }
    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
