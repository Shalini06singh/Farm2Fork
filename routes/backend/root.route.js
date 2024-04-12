const express = require('express');

const router = express.Router();

// category routes
const categoryRoutes = require('./category.route')

// product routes
const productRoutes = require('./product.route');

// user routes
const userRoutes = require('./user.route');

// order routes
const orderRoutes = require('./orders.route');

const { authorization } = require('../../middleware/authorization');

router.use(authorization)

router.use('/category', categoryRoutes)
router.use('/product', productRoutes)
router.use('/user', userRoutes)
router.use('/order', orderRoutes)


module.exports = router;