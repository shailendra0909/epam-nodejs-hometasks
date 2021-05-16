const StatusCodes = require('./ResponseCodes')

class CustomHttpError extends Error {
    constructor(name, message, statusCode, data) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.data = data;
        Error.captureStackTrace(this, CustomHttpError);
    }
};

class CustomHttpBadRequestError extends CustomHttpError {
    constructor(message = 'Bad Request', data) {
        super('HttpBadRequestError', message, StatusCodes.BAD_REQUEST, data);
    };
}


class CustomHttpNotFoundError extends CustomHttpError {
    constructor(message = 'Not found', data) {
        super('HttpNotFoundError', message, StatusCodes.BAD_REQUEST, data);
    };
}

class CustomInternalServerError extends CustomHttpError {
    constructor(message = 'Internal Server Error', data) {
        super('InternalServerError', message, StatusCodes.BAD_REQUEST, data);
    };
}


module.exports = {
    CustomHttpError,
    CustomHttpBadRequestError,
    CustomHttpNotFoundError,
    CustomInternalServerError
}