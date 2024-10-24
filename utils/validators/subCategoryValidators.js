const { check } = require("express-validator");
const slugify = require('slugify');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('SubCategory name can\'t empty')
        .isLength({ min: 2 })
        .withMessage('Too short SubCategory name')
        .isLength({ max: 32 })
        .withMessage('Too long SubCategory name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true;
        })
    ,

    check('category')
        .notEmpty()
        .withMessage('SubCategory must have Category id')
        .isMongoId()
        .withMessage('Invalid Category id format')
    ,
    validatorMiddleware
]


exports.getSubCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid SubCategory Id format'),
    validatorMiddleware
]


exports.updateSubCategoryValidator = [
    check('id')
        .notEmpty()
        .withMessage('SubCategory id can\'t be empty')
        .isMongoId()
        .withMessage('Not a SubCategory valid id format '),
    check('name')
        .notEmpty()
        .withMessage('SubCategory name is required')
        .isLength({ min: 3 })
        .withMessage('Too short SubCategory name')
        .isLength({ max: 32 })
        .withMessage('Too long SubCategory name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    validatorMiddleware
]


exports.deleteSubCategoryValidator = [
    check('id')
        .notEmpty()
        .withMessage("SubCategory id can't be empty")
        .isMongoId()
        .withMessage('Not a SubCategory valid id format '),
    validatorMiddleware
]