const express = require('express');
const { getOrders } = require('../../controllers/backend/order.controller');
const router = express.Router();

router.post('/',  getOrders)

module.exports = router;