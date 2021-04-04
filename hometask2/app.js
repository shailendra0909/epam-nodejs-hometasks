const express = require('express');
var bodyParser = require('body-parser');

const userRouter = require('./UserRoute');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`server started on http:localhost/${PORT}`);
})