const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');

const SubCategory = require('../models/SubCategory');



// @desc        Create SubCategory 
// @route       POST /api/v1/subcategories
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