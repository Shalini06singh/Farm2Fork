const express = require('express');
const { getCategories, storeCategory, editCategory, updateCategory, deleteCategory } = require('../../controllers/backend/category.controller');
const { upload } = require('../../middleware/fileUploadMiddleware');

const router = express.Router();

router.get('/', getCategories)

router.post('/store', upload.single('image'), storeCategory)

router.get('/edit/:id', editCategory)

router.post('/update/:id', upload.single('image'), updateCategory)

router.delete('/destroy/:id', deleteCategory)

module.exports = router;