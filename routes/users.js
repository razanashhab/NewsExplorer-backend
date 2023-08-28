const router = require('express').Router();

const { getUserByToken } = require('../controllers/users');

router.get('/users/me', getUserByToken);

module.exports = router;
