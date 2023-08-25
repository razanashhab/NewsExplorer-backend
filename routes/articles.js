const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');
const { validateURL } = require('../utils/validator');

router.post(
  '/articles',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required().min(1).max(30),
      title: Joi.string().required().min(1),
      text: Joi.string().required().min(1),
      date: Joi.date().required(),
      source: Joi.string().required().min(1),
      link: Joi.string().custom(validateURL),
      image: Joi.string().custom(validateURL),
    }),
  }),
  createArticle,
);

router.delete(
  '/articles/:articleId',
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteArticle,
);

router.get('/articles', getArticles);

module.exports = router;
