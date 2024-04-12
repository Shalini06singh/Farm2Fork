const express = require('express');
const { getCategories } = require('../../controllers/frontend/category.controller');
const { authorization } = require('../../middleware/authorization');

const router = express.Router();

router.use(authorization)
router.get('/categories', getCategories)

module.exports = router;