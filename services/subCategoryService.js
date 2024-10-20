const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');

const SubCategory = require('../models/SubCategory');
const ApiFeatures = require('../utils/ApiFeatures');



exports.setCategoryIdToBody = (req, res, next) => {
    if (!req.body.category) req.body.category = req.params.categoryId;
    next();
};



exports.createFilterObj = (req, res, next) => {
    let filterObj = {};
    // eslint-disable-next-line no-unused-expressions
    req.params.categoryId ? filterObj = { category: req.params.categoryId } : filterObj;
    req.filterObj = filterObj;

    next();
};


// Nested route
// @route GET /api/v1/categories/:categoryId/subcategories



// @desc Get list of subCategories 
// @route GET /api/v1/subCategories
// @access Public
exports.getSubCategories = asyncHandler(async (req, res, next) => {
    // BUILD QUERY 
    const documentsCount = await SubCategory.countDocuments();
    const apiFeatures = new ApiFeatures(SubCategory.find(), req.query)
        .paginate(documentsCount)
        .filter()
        .search()
        .sort()
        .limitFields();


    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures
    const subCategories = await mongooseQuery;

    return res.status(200).json({
        total_subCategories: subCategories.length,
        paginationResult,
        data: subCategories
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

