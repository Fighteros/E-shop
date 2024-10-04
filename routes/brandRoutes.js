const express = require('express');
const {
    createBrand,
    getBrand,
    getBrands,
    updateBrand,
    deleteBrand
} = require('../services/brandsService');

const {
    getBrandValidator,
    createBrandValidator,
    deleteBrandValidator,
    updateBrandValidator,
} = require('../utils/validators/brandValidators');



const router = express.Router();




router.route('/')
    .get(getBrands)
    .post(createBrandValidator, createBrand);

router.route('/:id')
    .get(getBrandValidator, getBrand)
    .put(updateBrandValidator, updateBrand)
    .delete(deleteBrandValidator, deleteBrand);


module.exports = router;