const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: [true, "SubCategory exists"],
        minLength: [2, "Too short SubCategory name"],
        maxLength: [32, "Too long SubCategory name"]
    },
    slug: {
        type: String,
        lowercase: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "SubCategory must belong to a Category"]
    }
},
    { timestamps: true }
);


const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;