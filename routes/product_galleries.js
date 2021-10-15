const express = require('express');
const router = express.Router();
const productGalleriesHandler = require('../controllers/product_galleries');

router.post('/create', productGalleriesHandler.create);
router.get('', productGalleriesHandler.getAll);
router.get('/:id', productGalleriesHandler.getOne);
router.post('/:id', productGalleriesHandler.update);
router.delete('/:id', productGalleriesHandler.destroy);

module.exports = router;
