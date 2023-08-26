const express = require('express');

const app = express();
const auth = require('../middleware/auth');
const { createUser, login } = require('../controllers/users');
const { validateLogin, validateSignup } = require('../utils/validator');

app.post('/signin', validateLogin, login);

app.post('/signup', validateSignup, createUser);

// authorization
app.use(auth);
app.use('/', require('./users'));
app.use('/', require('./articles'));

module.exports = app;
