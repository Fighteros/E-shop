const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');

const SubCategory = require('../models/SubCategory');



// Nested route
// @route GET /api/v1/categories/:categoryId/subcategories



// @desc Get list of subCategories 
// @route GET /api/v1/subCategories
// @access Public
exports.getSubCategories = asyncHandler(async (req, res, next) => {
    // * 1 To convert it to number! (JavaScript!)
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit; // (2 - 1) * 5 = 5 skip first

    let filterObj = {};

    if (req.params.categoryId) filterObj = { category: req.params.categoryId }
    // filter data to categoryId
    const subCategories = await SubCategory.find(filterObj)
        .skip(skip)
        .limit(limit);

    return res.status(200).json({
        results:
        {
            total_subCategories: subCategories.length,
            page,
            data: subCategories
        }
    });
});


// @desc Get specific SubCategory by id 
// @route GET /api/v1/subcategories/:id
// @access Public

exports.getSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
        return next(
            new ApiError(`There's no SubCategory for this id ${id}`, 404)
        )
    }

    res.status(200).json({ data: subCategory });

});




// @desc        Create SubCategory 
// @route       POST /api/v1/subCategories
// @access      Private

// @Known bug is no logic to verify that category id belongs to a real category
// so the user can add up any valid mongo id but does it matter when creating ?
exports.createSubCategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;
    const subCategory = await SubCategory.create({
        name: name,
        slug: slugify(name),
        category
    });
    res.status(201).json({ data: subCategory })
});



// @desc        Update SubCategory 
// @route       PUT /api/v1/subcategories/:id
// @access      Private

// @Known bug the same bug in create but does it matter when updating !?
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, category } = req.body;

    const subCategory = await SubCategory.findByIdAndUpdate(id,
        {
            name,
            slug: slugify(name),
            category
        },
        { new: true }
    );

    if (!subCategory) {
        return next(
            new ApiError(`There's no subcategory for this id ${id}`, 404)
        );
    }

    res.status(200).json({ data: subCategory });
});




// @desc        Delete SubCategory 
// @route       Delete /api/v1/subcategories/:id
// @access      Private

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const subCategory = await SubCategory.findByIdAndDelete(id);

    if (!subCategory) {
        return next(
            new ApiError(`There's no subcategory for this id ${id}`, 404)
        );
    }

    res.status(204).end();
});

