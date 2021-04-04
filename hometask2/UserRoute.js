const expess = require('express');
const validator = require('express-joi-validation').createValidator({})

const ErrorCodes = require('./CustomError/ResponseCodes');
const { userSchema, userIdSchema, userPutSchema } = require('./UserSchema');

const userService = require('./UserService');
const userRouter = expess.Router();

userRouter.get('/', (req, res) => {
    const userId = req.params.id;
    userService.getAllUser().then((users) => {
        res.json(users);
    }).catch((err) => {
        res.respond.notFoundError(err.message);
    });
});

userRouter.get('/:id', validator.params(userIdSchema), (req, res) => {
    const userId = req.params.id;
    userService.getUser(userId).then((user) => {
        res.json(user);
    }).catch((err) => {
        res.respond.notFoundError(err.message);
    });
});

userRouter.post('/', validator.body(userSchema), (req, res) => {
    userService.addUser(req.body).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.respond.badRequest(err.message);
    });
});

userRouter.put('/:id', validator.params(userIdSchema), validator.body(userPutSchema), (req, res) => {
    const id = req.params.id;
    userService.updateUser(id, req.body).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.respond.badRequest(err.message);
    });

});

userRouter.delete('/:id', validator.params(userIdSchema), (req, res) => {
    const id = req.params.id;
    userService.deleteUser(id).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.respond.badRequest(err.message);
    });

});

userRouter.get('/:loginSubstring/:limit', (req, res) => {
    const { loginSubstring, limit } = req.params;
    userService.getAutoSuggestUsers(loginSubstring, limit).then((users) => {
        res.json(users);
    }).catch((err) => {
        res.respond.notFoundError(err.message);
    });
});

module.exports = userRouter;
