const router = require('express').Router();
const { validateArticle, isArticleExist } = require('../utils/validator');
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.post('/articles', validateArticle, createArticle);

router.delete('/articles/:articleId', isArticleExist, deleteArticle);

router.get('/articles', getArticles);

module.exports = router;
