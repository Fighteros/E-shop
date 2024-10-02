const express = require('express');
const {
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdToBody,
    createFilterObj
} = require('../services/subCategoryService');

const {
    createSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator
} = require('../utils/validators/subCategoryValidators');


// mergeParams: Allow access to params from other routers
const router = express.Router({ mergeParams: true });



router.route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory);

router.route("/")
    .get(createFilterObj, getSubCategories)
    .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory);


module.exports = router