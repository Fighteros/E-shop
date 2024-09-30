const express = require('express');
const { createSubCategory, getSubCategories, getSubCategory } = require('../services/subCategoryService');
const { createSubCategoryValidator, getSubCategoryValidator } = require('../utils/validators/subCategoryValidators');


const router = express.Router();


router.route('/:id').get(getSubCategoryValidator, getSubCategory);
router.route("/").get(getSubCategories).post(createSubCategoryValidator, createSubCategory);


module.exports = router