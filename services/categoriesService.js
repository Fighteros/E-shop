// makes any text space to - and make all letters lowercase
const slugify = require('slugify');
// Passes errors to express error handlers out of box
// For clean code async await syntax 
const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');
const ApiError = require('../utils/ApiError');
const ApiFeatures = require('../utils/ApiFeatures');
const factory = require('./handlersFactory')

// @desc Get list of categories 
// @route GET /api/v1/categories
// @access Public
exports.getCategories = asyncHandler(async (req, res, next) => {
    // BUILD QUERY 
    const documentsCount = await Category.countDocuments();
    const apiFeatures = new ApiFeatures(Category.find(), req.query)
        .paginate(documentsCount)
        .filter()
        .search()
        .sort()
        .limitFields();


    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures


    const categories = await mongooseQuery;
    return res.status(200).json({
        total_categories: categories.length,
        paginationResult,
        data: categories
    });
});


// @desc Get specific category by id 
// @route GET /api/v1/categories/:id
// @access Public

exports.getCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
        return next(
            new ApiError(`There's no category for this id ${id}`, 404)
        )
    }

    res.status(200).json({ data: category });

});



// @desc Create category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await Category.create({
        name: name,
        slug: slugify(name)
    });
    res.status(201).json({ data: category });
});


// @desc Update specific category
// @route PUT /api/v1/categories/:id
// @access Private

exports.updateCategory = factory.updateOne(Category);


// @desc Delete specific category
// @route DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = factory.deleteOne(Category);
