const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    const customErr = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong',
    };

    return res.status(customErr.statusCode).json({
        msg: customErr.msg
    });
}

module.exports = errorHandlerMiddleware;