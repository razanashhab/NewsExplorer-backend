const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { NOT_FOUND_ID_MSG, FORBIDDEN_MSG } = require('../utils/utils');

module.exports.getArticles = (req, res, next) => {
  Article.findOne({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch((err) => next(err));
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.send({
      data: {
        _id: article._id,
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      },
    }))
    .catch((err) => next(err));
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_ID_MSG);
    })
    .select('+owner')
    .then((article) => {
      console.log(`active user is:${req.user._id} owner is:${article.owner}`);
      if (req.user._id !== String(article.owner)) throw new ForbiddenError(FORBIDDEN_MSG);

      return Article.findByIdAndRemove(req.params.articleId).orFail(() => {
        throw new NotFoundError(NOT_FOUND_ID_MSG);
      });
    })
    .then((article) => res.send({
      data: {
        _id: article._id,
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      },
    }))
    .catch((err) => next(err));
};
