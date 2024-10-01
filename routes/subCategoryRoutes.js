const express = require('express');
const { createSubCategory, getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory } = require('../services/subCategoryService');
const { createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require('../utils/validators/subCategoryValidators');


const router = express.Router();


router.route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory);

router.route("/")
    .get(getSubCategories)
    .post(createSubCategoryValidator, createSubCategory);


module.exports = router