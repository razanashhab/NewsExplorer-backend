const router = require('express').Router();
const {
  validateUser,
  validateLogin,
  validateSignup,
} = require('../utils/validator');
const { createUser, getUserByToken, login } = require('../controllers/users');

router.get('/users/me', getUserByToken);

router.post('/users', validateUser, createUser);

router.post('/signin', validateLogin, login);

router.post('/signup', validateSignup, createUser);

module.exports = router;
