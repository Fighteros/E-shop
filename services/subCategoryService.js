const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');

const SubCategory = require('../models/SubCategory');






// @desc Get list of subCategories 
// @route GET /api/v1/subCategories
// @access Public
exports.getSubCategories = asyncHandler(async (req, res, next) => {
    // * 1 To convert it to number! (JavaScript!)
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit; // (2 - 1) * 5 = 5 skip first
    const subCategories = await SubCategory.find({}).skip(skip).limit(limit);
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
exports.createSubCategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;
    const subCategory = await SubCategory.create({
        name: name,
        slug: slugify(name),
        category
    });
    res.status(201).json({ data: subCategory })
});