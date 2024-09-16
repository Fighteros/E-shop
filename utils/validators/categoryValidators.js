const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category name is required'),
    validatorMiddleware
]

