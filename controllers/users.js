const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const {
  NOT_FOUND_ID_MSG,
  BAD_REQUEST_MSG,
  CONFLICT_MSG,
  NOT_AUTHORIZED_MSG,
} = require('../utils/utils');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  Users.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_ID_MSG);
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        throw new ConflictError(CONFLICT_MSG);
      }
      bcrypt
        .hash(password, 10)
        .then((hash) => Users.create({
          email,
          password: hash,
          name,
        }))
        .then((usr) => {
          if (!usr) throw new BadRequestError(BAD_REQUEST_MSG);
          return res.send({
            data: { _id: usr._id, email: usr.email, name: usr.name },
          });
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return Users.findUserByCredentials(email, password)
    .then((user) => res.send({
      token: jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        {
          expiresIn: '7d',
        },
      ),
    }))
    .catch((err) => {
      next(new NotAuthorizedError(NOT_AUTHORIZED_MSG));
    });
};

module.exports.getUserByToken = (req, res, next) => {
  Users.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_ID_MSG);
    })
    .then((user) => res.send({ data: { _id: user._id, email: user.email, name: user.name } }))
    .catch((err) => next(err));
};
