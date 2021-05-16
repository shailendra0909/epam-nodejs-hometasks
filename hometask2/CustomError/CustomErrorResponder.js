const { CustomHttpBadRequestError, CustomHttpNotFoundError, CustomInternalServerError } = require('./HttpError');


const CustomErrorResponder = (_req, _res, next) => {
    const responder = {
        _processError: (error, data, ErrorClass = Error) => {
            const errMessage = ErrorClass instanceof Error ? errorClass.message : error;
            const errorToForward = new ErrorClass(errMessage, data);

            next(errorToForward);
        },

        badRequest: (error, data) => {
            return responder._processError(error, data, CustomHttpBadRequestError);

        },
        notFoundError: (error, data) => {
            return responder._processError(error, data, CustomHttpNotFoundError);

        },
        serverError: (error, data) => {
            return responder._processError(error, data, CustomInternalServerError);
        }

    }

    return responder;
}

function attachResponder(req, res, next) {
    res.respond = CustomErrorResponder(req, res, next);
    next();
}

module.exports = attachResponder;