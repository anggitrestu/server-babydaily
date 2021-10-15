const express = require('express');
const router = express.Router();
const transactionsHandler = require('../controllers/transactions');

router.post('/', transactionsHandler.create);

module.exports = router;
