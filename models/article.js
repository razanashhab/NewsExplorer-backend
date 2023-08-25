const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
  },
  date: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    required: true,
    minlength: 1,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /http[s]?:\/\/[www.]?[a-z1-9._~:/?%#[\]@!$&'()*+,;=]/.test(v);
      },
      message: 'Error',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /http[s]?:\/\/[www.]?[a-z1-9._~:/?%#[\]@!$&'()*+,;=]/.test(v);
      },
      message: 'Error',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

articleSchema.plugin(passportLocalMongoose, {
  selectFields: 'keyword title text date source link image',
});

module.exports = mongoose.model('article', articleSchema);
