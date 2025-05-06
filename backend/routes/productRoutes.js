const express = require('express');
const router = express.Router();
const { addProduct, deleteProduct, getAllProducts, getProductById, getProductByCategory, getProductBySubCategory, updateProduct, getProductsBySubCategorySlug } = require('../controllers/productController');
const { uploadMiddleware, handleMulterError } = require('../config/productUpload');

router.post('/', uploadMiddleware, handleMulterError, addProduct);
router.delete('/:id', deleteProduct);
router.get('/', getAllProducts);
router.get('/:_id', getProductById);
router.put('/:_id',uploadMiddleware, handleMulterError, updateProduct);


// New Routes to get products by category
router.get('/category/:categoryId', getProductByCategory);
router.get('/subcategory/:subCategoryId', getProductBySubCategory);
router.get("/subcategory/slug/:slug", getProductsBySubCategorySlug);

module.exports = router;