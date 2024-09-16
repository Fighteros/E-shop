const Category = require('../models/Category');
const ApiError = require('../utils/ApiError');


exports.createCategory = (req, res, next) => {
    const category = new Category({
        name: req.body.name
    });
    category.save().then((cat) => {
        res.status(201).json({ data: cat });
    }).catch((err) => {
        return next(new ApiError(
            'There\'s a problem creating a category at the moment',
            400
        ))
    });
}

exports.getAllCategories = async (req, res, next) => {
    const categories = await Category.find();
    if (!categories) {
        return next(
            new ApiError('There are no Categories found', 404)
        )
    }
    return res.status(200).json({ data: categories });
}