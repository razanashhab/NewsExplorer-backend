const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

module.exports.validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(1).max(30),
    title: Joi.string().required().min(1),
    text: Joi.string().required().min(1),
    date: Joi.date().required(),
    source: Joi.string().required().min(1),
    link: Joi.string().custom(validateURL),
    image: Joi.string().custom(validateURL),
  }),
});

module.exports.isArticleExist = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
});

module.exports.validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});
