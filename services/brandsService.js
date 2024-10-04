// makes any text space to - and make all letters lowercase
const slugify = require('slugify');
// Passes errors to express error handlers out of box
// For clean code async await syntax 
const asyncHandler = require('express-async-handler');
const Brand = require('../models/Brand');
const ApiError = require('../utils/ApiError');



// @desc Get list of brands 
// @route GET /api/v1/brands
// @access Public
exports.getBrands = asyncHandler(async (req, res, next) => {
    // * 1 To convert it to number! (JavaScript!)
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit; // (2 - 1) * 5 = 5 skip first

    const brands = await Brand.find({}).skip(skip).limit(limit);
    return res.status(200).json({
        data:
        {
            total_brands: brands.length,
            page,
            data: brands
        }
    });
});


// @desc Get specific brand by id 
// @route GET /api/v1/brands/:id
// @access Public

exports.getBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);

    if (!brand) {
        return next(
            new ApiError(`There's no brand for this id ${id}`, 404)
        )
    }

    res.status(200).json({ data: brand });

});



// @desc Create Brand
// @route POST /api/v1/brands
// @access Private
exports.createBrand = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const brand = await Brand.create({
        name: name,
        slug: slugify(name)
    });
    res.status(201).json({ data: brand });
});


// @desc Update specific Brand
// @route PUT /api/v1/brands/:id
// @access Private

exports.updateBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    const brand = await Brand.findOneAndUpdate(
        { _id: id },
        {
            name: name,
            slug: slugify(name)
        },
        // To return the object after updated!
        { new: true }
    );

    if (!brand) {
        return next(
            new ApiError(`There's no brand for this id ${id}`, 404)
        )
    }

    res.status(200).json({ data: brand });
});


// @desc Delete specific Brand
// @route DELETE /api/v1/brands/:id
// @access Private

exports.deleteBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);

    if (!brand) {
        return next(
            new ApiError(`There's no brand for this id ${id}`, 404)
        )
    }

    res.status(204).end();
});


