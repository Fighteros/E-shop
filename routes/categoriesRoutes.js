const express = require('express');
const { createCategory, getCategory, getCategories, updateCategory, deleteCategory } = require('../services/categoriesService');
const { getCategoryValidator, createCategoryValidator, deleteCategoryValidator, updateCategoryValidator, } = require('../utils/validators/categoryValidators');




const router = express.Router();




router.route('/')
    .get(getCategories)
    .post(createCategoryValidator, createCategory);

router.route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);


module.exports = router;