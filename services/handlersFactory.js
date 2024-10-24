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


exports.updateOne = (Model) => asyncHandler(async (req, res, next) => {

    const document = await Model.findByIdAndUpdate(
        req.params.id,
        req.body
        ,
        // To return the object after updated!
        { new: true }
    );

    if (!document) {
        return next(
            new ApiError(`There's no document for this id ${req.params.id}`, 404)
        )
    }

    res.status(200).json({ data: document });
});



exports.createOne = (Model) => asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
});
