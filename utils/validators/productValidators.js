const { check } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Category = require('../../models/Category');
const SubCategory = require('../../models/SubCategory');



exports.createProductValidator = [
    check('title')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters long')
        .notEmpty()
        .withMessage('Title cannot be empty')
        .isLength({ max: 100 })
        .withMessage('Too long product title')
    ,

    check('description')
        .notEmpty()
        .withMessage('Product description cannot be empty')
        .isLength({ max: 2000 })
        .withMessage('Product description Too long')
        .isLength({ min: 20 })
        .withMessage('Product description too short')

    ,

    check('quantity')
        .isNumeric()
        .withMessage('Product quantity must be numeric')
        .notEmpty()
        .withMessage('Product quantity cannot be empty')
    ,

    check('sold')
        .optional()
        .isNumeric()
        .withMessage('Product sold quantity must be numeric')

    ,

    check('price')
        .isNumeric()
        .withMessage('Product price must be numeric')
        .notEmpty()
        .withMessage('Product price cannot be empty')
        .isLength({ max: 32 })
        .withMessage('Product price too long')

    ,

    check('priceAfterDiscount')
        .isNumeric()
        .withMessage('Product price after discount must be numeric')
        .optional()
        .toFloat()
        .custom((value, { req }) => {
            if (req.body.price < value) {
                throw new Error('Price after discount must be less than price');
            }
            return true;
        })
    ,

    check('colors')
        .optional()
        .isArray()
        .withMessage('Product colors must be an array')

    ,

    check('imageCover')
        .notEmpty()
        .withMessage('Product image cover cannot be empty')

    ,

    check('images')
        .optional()
        .isArray()
        .withMessage('Product images must be an array')

    ,

    check('category')
        .notEmpty()
        .withMessage('Product must belong to a category')
        .isMongoId()
        .withMessage('Invalid Category id format')
        .custom((categoryId) =>
            Category.findById(categoryId).then((category) => {
                if (!category) {
                    return Promise.reject(new Error(`Invalid category id ${categoryId}`))
                }
            }))
    ,

    check('subcategories')
        .optional()
        .isMongoId()
        .withMessage('Invalid Subcategory id format')
        // Validate that subcategories in body are valid and found in db
        .custom((subcategoriesIds) => SubCategory.find({ _id: { $exists: true, $in: subcategoriesIds } })
            .then((result) => {
                // Length of subcategories equals length of Subcategories in body
                if (result.length < 1 || result.length !== subcategoriesIds.length) {
                    return Promise.reject(new Error('Invalid Subcategories ids'));
                }
            }))
        //Validate that subcategories belong to category
        .custom((subcategoriesIds, { req }) => SubCategory.find({ category: req.body.category }).then((res) => {
            const subcategoriesIdsInDB = [];
            res.forEach(subCategory => subcategoriesIdsInDB.push(subCategory._id.toString()));
            // Compare Subcategories ids from body to subcategories ids in db 
            const checker = (target, arr) => target.every((v) => arr.includes(v));
            if (!checker(subcategoriesIds, subcategoriesIdsInDB)) {
                return Promise.reject(new Error('Subcategories don\'t belong to the category'));
            }

        })
        )
    // delete duplicate subcategories from body

    ,

    check('brand')
        .optional()
        .isMongoId()
        .withMessage('Invalid Brand id format')

    ,

    check('ratingsAverage')
        .optional()
        .isNumeric()
        .withMessage('Product ratings average must be numeric')
        .isLength({ min: 1, max: 5 })
        .withMessage('Product ratings average must be between 1.0 and 5.0')

    ,

    check('ratingsQuantity')
        .optional()
        .isNumeric()
        .withMessage('Product ratings quantity must be numeric')

    ,

    validatorMiddleware

]



exports.getProductValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid product id format')
    ,
    validatorMiddleware
]

exports.updateProductValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid product id format'),
    check('title')
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        })
    ,
    validatorMiddleware
]

exports.deleteProductValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid product id format')
    ,
    validatorMiddleware
]
