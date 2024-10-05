const express = require('express');
const { createProduct, deleteProduct, getProduct, getProducts, updateProduct } = require('../services/productsService');
const { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } = require('../utils/validators/productValidators');




const router = express.Router();



router.route('/')
    .get(getProducts)
    .post(createProductValidator, createProduct);

router.route('/:id')
    .get(getProductValidator, getProduct)
    .put(updateProductValidator, updateProduct)
    .delete(deleteProductValidator, deleteProduct);


module.exports = router;