const express = require('express');

require('dotenv').config();

const userRouter = require('./UserRoute');
const groupRoute = require('./GroupRoute');
const ErrorCodes = require('./CustomError/ResponseCodes');
const { CustomHttpError } = require('./CustomError/HttpError');
const attachResponder = require('./CustomError/CustomErrorResponder');
const getMorganLogger = require('./loggers/customMorganLogger');
const sequelize = require('./dbConnection/db');
const responseTimeCalc = require('./responseTimeCalc');
const logger = require('./loggers/winstonLogger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(attachResponder);

//morgan logger for the req logging
app.use(getMorganLogger());

const PORT = process.env.PORT || 3000;

//custom middleware for timing calculation
app.use(responseTimeCalc);

//user route handler
app.use('/users', userRouter);
app.use('/groups', groupRoute);


//default route handler
app.all('*', (_req, _res) => {
    throw new Error('No route available');
});

//custon error handlers
app.use((err, _req, res, _next) => {
    if (err instanceof CustomHttpError) {
        logger.error({ error: err.message, ...err.data });
        res.status(err.statusCode).json({ error: err.message }).end();
    } else {
        res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({ error: err.message }).end();
    }

});

//uncaughtException handler
process.on('uncaughtException', (error) => {
    sequelize.close().then(() => {
        logger.error('shutting down server due to => ' + error);
        process.exit(1);
    });
}).on('unhandledRejection', (reason, p) => {
    logger.error(reason, 'Unhandled Rejection at Promise', p);
});

app.listen(PORT, () => {
    console.log(`server started on http:localhost/${PORT}`);
});