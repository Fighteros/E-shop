const express = require('express');
const { createSubCategory, getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory } = require('../services/subCategoryService');
const { createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require('../utils/validators/subCategoryValidators');


// mergeParams: Allow access to params from other routers
const router = express.Router({ mergeParams: true });



router.route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory);

router.route("/")
    .get(getSubCategories)
    .post(createSubCategoryValidator, createSubCategory);


module.exports = router