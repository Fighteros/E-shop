const express = require('express');
const { createCategory, getCategory, getCategories, updateCategory, deleteCategory } = require('../services/categoriesService');
const { createCategoryValidator } = require('../utils/validators/categoryValidators');




const router = express.Router();




router.route('/')
    .get(getCategories)
    .post(createCategoryValidator, createCategory);

router.route('/:id').get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory);


module.exports = router;