const { param, check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


exports.getCategoryValidator = [
    param('id')
        .isMongoId()
        .withMessage('Invalid category id'),
    validatorMiddleware
]

exports.createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category name is required'),
    validatorMiddleware
]

