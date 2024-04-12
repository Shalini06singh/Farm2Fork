const express = require('express');
const { checkout, stripePayment } = require('../../controllers/frontend/checkout.controller');

const router = express.Router();

router.post('/checkout/:cartId', checkout)
router.post('/stripe/pay', stripePayment)

module.exports = router;