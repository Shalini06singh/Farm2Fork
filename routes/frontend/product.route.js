const express = require('express');
const { getProducts, productById } = require('../../controllers/frontend/product.controller');

const router = express.Router();

router.get('/products', getProducts)
router.get('/product/:id', productById)

module.exports = router;