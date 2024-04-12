const express = require('express');
const { getCart, addCart, updateCart, destroyCart } = require('../../controllers/frontend/cart.controller');
const { authorization } = require('../../middleware/authorization');

const router = express.Router();

router.use(authorization)
router.post('/cart/:userId', getCart)
router.post('/cart/add/:userId', addCart)
router.post('/cart/update/:userId', updateCart)
router.delete('/cart/destroy/:userId', destroyCart)

module.exports = router;