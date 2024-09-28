// @desc This class is responsible of operational errors  (predicated errors)

class ApiError extends Error {
    constructor(message, code) {
        super(message);
        this.statusCode = code;
        this.status = `${code}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
    }
}


module.exports = ApiError;