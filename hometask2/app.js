const express = require('express');

require('dotenv').config();

const userRouter = require('./UserRoute');
const groupRoute = require('./GroupRoute');
const ErrorCodes = require('./CustomError/ResponseCodes');
const { CustomHttpError } = require('./CustomError/HttpError');
const attachResponder = require('./CustomError/CustomErrorResponder');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(attachResponder);

const PORT = process.env.PORT || 3000;
//custom middleware


//user route handler
app.use('/users', userRouter);
app.use('/groups', groupRoute);


//default route handler
app.all('*', (req, res) => {
    throw new Error('No route available')
})

//error handlers
app.use((err, req, res, next) => {
    if (err instanceof CustomHttpError) {
        res.status(err.statusCode).json({ error: err.message, ...err.data }).end();
    } else {
        res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({ error: err.message, ...err.data }).end();
    }

});

app.listen(PORT, () => {
    console.log(`server started on http:localhost/${PORT}`);
})