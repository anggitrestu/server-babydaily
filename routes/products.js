const express = require('express');
const router = express.Router();
const productsHandler = require('../controllers/products');

router.post('/create', productsHandler.create);
router.get('', productsHandler.getAll);
router.get('/:id', productsHandler.getOne);
router.post('/:id', productsHandler.update);
router.delete('/:id', productsHandler.destroy);

module.exports = router;
