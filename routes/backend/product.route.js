const express = require('express');
const { upload } = require('../../middleware/fileUploadMiddleware');
const { getProducts, storeProduct, editProduct, updateProduct, deleteProduct } = require('../../controllers/backend/product.controller');

const router = express.Router();

router.get('/', getProducts)

router.post('/store', upload.single('image'), storeProduct)

router.get('/edit/:id', editProduct)

router.post('/update/:id', upload.single('image'), updateProduct)

router.delete('/destroy/:id', deleteProduct)

module.exports = router;