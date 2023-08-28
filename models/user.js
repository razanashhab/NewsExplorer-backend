const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const passportLocalMongoose = require('passport-local-mongoose');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

// write your code here
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Wrong email format',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
    toObject: { useProjection: true },
    toJSON: { useProjection: true },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'React User',
  },
});

userSchema.plugin(passportLocalMongoose, {
  selectFields: 'email name',
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new NotAuthorizedError('Incorrect password or email'),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new NotAuthorizedError('Incorrect password or email'),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
