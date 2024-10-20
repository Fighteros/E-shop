// makes any text space to - and make all letters lowercase
const slugify = require('slugify');
// Passes errors to express error handlers out of box
// For clean code async await syntax 
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const ApiError = require('../utils/ApiError');



// @desc Get list of products
// @route GET /api/v1/products
// @access Public
exports.getProducts = asyncHandler(async (req, res, next) => {

    //1. Filter

    const queryStringObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields", "keyword"]

    excludeFields.forEach(field => delete queryStringObj[field]);

    // Apply filter using [gt|gte|le|lte]
    // "{price: {$gte: 50}, ratingsAverage: {$gte: 4} }"
    // { ratingsAverage: { gte: '4.0' }, price: { gte: '50' } }
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|le)\b/g, value => `$${value}`)



    // 2. Pagination
    // * 1 To convert it to number! (JavaScript!)
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit; // (2 - 1) * 5 = 5 skip first



    // Build query 
    let mongooseQuery = Product.find(JSON.parse(queryStr))
        // filter results to search
        // .where('price').equals(req.query.price).where('ratingsAverage').equals(req.query.ratingsAverage)
        .skip(skip)
        .limit(limit)
        .populate({ path: "category", select: "name -_id" });




    // 3- Sorting 
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(' ');

        mongooseQuery = mongooseQuery.sort(sortBy);
    } else {
        // new to old
        mongooseQuery = mongooseQuery.sort("-createdAt")
    }


    // 4- Fields limiting
    if (req.query.fields) {
        const limitBy = req.query.fields.split(',').join(' ');
        mongooseQuery = mongooseQuery.select(limitBy);
    }
    else {
        mongooseQuery = mongooseQuery.select('-__v');
    }



    // 5- Search 

    if (req.query.keyword) {
        const query = {};
        query.$or = [
            { title: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } },
        ];
        mongooseQuery = mongooseQuery.find(query)
    }



    // Execute query
    const products = await mongooseQuery;



    return res.status(200).json({
        data:
        {
            total_categories: products.length,
            page,
            data: products
        }
    });
});


// @desc Get specific Product by id 
// @route GET /api/v1/products/:id
// @access Public

exports.getProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id)
        .populate({ path: "category", select: "name -_id" });

    if (!product) {
        return next(
            new ApiError(`There's no product for this id ${id}`, 404)
        )
    }

    res.status(200).json({ data: product });

});



// @desc Create product
// @route POST /api/v1/products
// @access Private
exports.createProduct = asyncHandler(async (req, res) => {

    req.body.slug = slugify(req.body.title);

    const product = await Product.create(req.body);

    res.status(201).json({ data: product });
});


// @desc Update specific product
// @route PUT /api/v1/products/:id
// @access Private

exports.updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.title) {
        req.body.slug = slugify(req.body.title);

    }
    const product = await Product.findOneAndUpdate(
        { _id: id },
        req.body,
        // To return the object after updated!
        { new: true }
    );

    if (!product) {
        return next(
            new ApiError(`There's no product for this id ${id}`, 404)
        )
    }

    res.status(200).json({ data: product });
});


// @desc Delete specific product
// @route DELETE /api/v1/products/:id
// @access Private

exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        return next(
            new ApiError(`There's no product for this id ${id}`, 404)
        )
    }

    res.status(204).end();
});


