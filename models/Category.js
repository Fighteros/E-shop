const mongoose = require('mongoose');


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category required'],
        unique: [true, 'Category must be unique'],
        minLength: [3, 'Too short category name'],
        maxLength: [32, "Too long category name"]
    },
    // A and B => shopping.com/a-and-b
    slug: {
        type: String,
        lowercase: true
    },

    image: String,

},
    // created at & updated at stamps 
    { timestamps: true }
);


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;