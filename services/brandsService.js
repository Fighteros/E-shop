// makes any text space to - and make all letters lowercase
const slugify = require('slugify');
// Passes errors to express error handlers out of box
// For clean code async await syntax 
const asyncHandler = require('express-async-handler');
const Brand = require('../models/Brand');
const ApiError = require('../utils/ApiError');

const factory = require('./handlersFactory')
const ApiFeatures = require('../utils/ApiFeatures')


// @desc Get list of brands 
// @route GET /api/v1/brands
// @access Public
exports.getBrands = asyncHandler(async (req, res, next) => {
    // BUILD QUERY 
    const documentsCount = await Brand.countDocuments();
    const apiFeatures = new ApiFeatures(Brand.find(), req.query)
        .paginate(documentsCount)
        .filter()
        .search()
        .sort()
        .limitFields();


    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures
    const brands = await mongooseQuery;


    return res.status(200).json({
        total_brands: brands.length,
        paginationResult,
        data: brands
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
exports.createBrand = factory.createOne(Brand);

// @desc Update specific Brand
// @route PUT /api/v1/brands/:id
// @access Private

exports.updateBrand = factory.updateOne(Brand);


// @desc Delete specific Brand
// @route DELETE /api/v1/brands/:id
// @access Private

exports.deleteBrand = factory.deleteOne(Brand);

