const Category = require('../models/Category');
const ApiError = require('../utils/ApiError');

// makes any text space to - and make all letters lowercase
const slugify = require('slugify');


// Passes errors to express error handlers out of box
// For clean code async await syntax 
const asyncHandler = require('express-async-handler');


// @desc Get list of categories 
// @route GET /api/v1/categories
// @access Public
exports.getCategories = asyncHandler(async (req, res, next) => {
    // * 1 To convert it to number! (JavaScript!)
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit; // (2 - 1) * 5 = 5 skip first
    const categories = await Category.find({}).skip(skip).limit(limit);
    return res.status(200).json({
        data:
        {
            totalCategories: categories.length,
            page,
            categories: categories
        }
    });
});


// @desc Get specific category by id 
// @route GET /api/v1/categories/:id
// @access Public

exports.getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
        return next(
            new ApiError(`There\'s no category for this id ${id}`, 404)
        )
    }

    res.status(200).json({ data: category });

});



// @desc Create category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = asyncHandler(async (req, res, next) => {
    const name = req.body.name;
    const category = await Category.create({
        name: req.body.name,
        slug: slugify(req.body.name)
    });
    res.status(201).json({ data: category });
});


// @desc Update specific category
// @route PUT /api/v1/categories/:id
// @access Private

exports.updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return next(new ApiError('Name can\'t be empty!', 422));
    }

    const category = await Category.findOneAndUpdate(
        { _id: id },
        {
            name: name,
            slug: slugify(name)
        },
        // To return the object after updated!
        { new: true }
    );

    if (!category) {
        return next(
            new ApiError(`There\'s no category for this id ${id}`, 404)
        )
    }

    res.status(200).json({ data: category });
});


// @desc Delete specific category
// @route DELETE /api/v1/categories/:id
// @access Private

exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
        return next(
            new ApiError(`There\'s no category for this id ${id}`, 404)
        )
    }

    res.status(204).send();
});


