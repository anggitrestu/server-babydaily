const express = require('express');
const router = express.Router();
const usersHandler = require('../controllers/users');

router.post('/register', usersHandler.register);
router.post('/login', usersHandler.login);
router.get('/:id', usersHandler.getUser);
router.post('/:id', usersHandler.update);

module.exports = router;
