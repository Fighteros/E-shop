const express = require('express');
const { createSubCategory } = require('../services/subCategoryService');
const { createSubCategoryValidator } = require('../utils/validators/subCategoryValidators');


const router = express.Router();



router.route("/").post(createSubCategoryValidator, createSubCategory);


module.exports = router