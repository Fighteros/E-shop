const express = require('express');
const { createCategory, getCategory, getCategories, updateCategory, deleteCategory } = require('../services/categoriesService');
const { getCategoryValidator, createCategoryValidator } = require('../utils/validators/categoryValidators');




const router = express.Router();




router.route('/')
    .get(getCategories)
    .post(createCategoryValidator, createCategory);

router.route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(updateCategory)
    .delete(deleteCategory);


module.exports = router;