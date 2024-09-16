class ApiError extends Error {
    constructor(message, code) {
        super(message);
        this.statusCode = code;
        // this.status = `${code}`.startsWith('4') ? 'error' : 'fail';
        this.isOperational = true;
    }
}


module.exports = ApiError;