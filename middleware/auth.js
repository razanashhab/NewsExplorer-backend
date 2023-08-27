const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const { NOT_AUTHORIZED_MSG } = require('../utils/utils');
const { JWT_DEV } = require('../configuration/configuration');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new NotAuthorizedError(NOT_AUTHORIZED_MSG);
    }

    const token = authorization.replace('Bearer ', '');

    const payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV,
      {
        expiresIn: '7d',
      },
    );

    if (!payload) {
      throw new NotAuthorizedError(NOT_AUTHORIZED_MSG);
    }
    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
