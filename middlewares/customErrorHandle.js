const ApiError = require('../utils/ApiError');
const customErrorHandle = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    else {
        console.log(err.message);
        return res.status(500).json({
            error: 'Server fault',
        });
    }

}



module.exports = customErrorHandle;
