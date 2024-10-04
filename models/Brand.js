const mongoose = require('mongoose');


const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Brand required'],
        unique: [true, 'Brand must be unique'],
        minLength: [3, 'Too short Brand name'],
        maxLength: [32, "Too long Brand name"]
    },
    slug: {
        type: String,
        lowercase: true
    },

    image: String,

},
    { timestamps: true }
);


const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;