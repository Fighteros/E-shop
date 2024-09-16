const express = require('express');
const { createCategory, getCategory, getCategories } = require('../services/categoriesService');
const { createCategoryValidator } = require('../utils/validators/categoryValidators');




const router = express.Router();




router.route('/')
    .get(getCategories)
    .post(createCategoryValidator, createCategory);

router.route('/:id').get(getCategory);

 
module.exports = router;