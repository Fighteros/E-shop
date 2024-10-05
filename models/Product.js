const mongoose = require('mongoose');


const productSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Too short product title'],
        maxLength: [100, 'Too long product title']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        minLength: [20, 'Too Short product description'],
        maxLength: [2000, 'Too long product description ']
    },

    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
    },

    sold: {
        type: Number,
        default: 0
    },

    price: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        max: [32, 'Tool long product price']
    },
    priceAfterDiscount: {
        type: Number
    },

    colors: [String],

    imageCover: {
        type: String,
        required: [true, 'Product image cover is required']
    },

    images: [String],

    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Product must belong to a category']
    },

    subcategory: [{
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory'
    }],

    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand'
    }
    ,

    ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above or equal to 1.0'],
        max: [5, 'Rating must be below or equal to 5.0']
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    }
},
    {
        timestamp: true
    });


const Product = mongoose.model('Product', productSchema);

module.exports = Product;