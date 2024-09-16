const express = require('express');
const { createCategory, getAllCategories } = require('../services/categoriesService');
const { createCategoryValidator } = require('../utils/validators/categoryValidators');




const router = express.Router();



router.get('/', getAllCategories);
router.post('/', createCategoryValidator, createCategory);

module.exports = router;