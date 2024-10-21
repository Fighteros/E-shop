const asyncHandler = require('express-async-handler');

const ApiError = require('../utils/ApiError');
const ApiFeatures = require('../utils/ApiFeatures');


exports.deleteOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
        return next(
            new ApiError(`There's no document for this id ${id}`, 404)
        )
    }

    res.status(204).end();
});