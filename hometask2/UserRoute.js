const expess = require('express');
const validator = require('express-joi-validation').createValidator({})

const { userSchema, userIdSchema, userPutSchema } = require('./dbConnection/UserSchema');

const userService = require('./services/UserService');
const userRouter = expess.Router();

userRouter.get('/', (_req, res) => {
    userService.getAllUser().then((users) => {
        res.json(users);
    }).catch((err) => {
        res.respond.notFoundError(err.message, {method:'user:getAllUsers'});
    });
});

userRouter.get('/:id', validator.params(userIdSchema), (req, res) => {
    const userId = req.params.id;
    userService.getUser(userId).then((user) => {
        res.json(user);
    }).catch((err) => {
        res.respond.notFoundError(err.message, {method:'user:getUser', args:{userId}});
    });
});

userRouter.post('/', validator.body(userSchema), (req, res) => {
    userService.addUser(req.body).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.respond.badRequest(err.message, {method:'user:createUser'});
    });
});

userRouter.put('/:id', validator.params(userIdSchema), validator.body(userPutSchema), (req, res) => {
    const id = req.params.id;
    userService.updateUser(id, req.body).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.respond.badRequest(err.message, {method:'user:update', args:{id}});
    });

});

userRouter.delete('/:id', validator.params(userIdSchema), (req, res) => {
    const id = req.params.id;
    userService.deleteUser(id).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.respond.badRequest(err.message, {method:'user:delete', args:{id}});
    });

});

userRouter.get('/:loginSubstring/:limit', (req, res) => {
    const { loginSubstring, limit } = req.params;
    userService.getAutoSuggestUsers(loginSubstring, limit).then((users) => {
        res.json(users);
    }).catch((err) => {
        res.respond.notFoundError(err.message, {method:'user:loginSubstring', args:{limit}});
    });
});

module.exports = userRouter;
