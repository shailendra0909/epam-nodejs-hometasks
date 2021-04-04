const expess = require('express');


const userService = require('./UserService');

const userRouter = expess.Router();

userRouter.get('/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await userService.getUser(userId)
    res.send(user);
});

userRouter.post('/', async (req, res) => {
    const user = await userService.addUser(req.body);
    res.send(user);
});

userRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await userService.updateUser(id, res.body);
    res.send(user);
});

userRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const user = userService.deleteUser(id);
    res.send(user);
});

module.exports = userRouter;
