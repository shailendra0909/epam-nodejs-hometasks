
const expess = require('express');
const validator = require('express-joi-validation').createValidator({})
const groupRoute = expess.Router();

const Group = require('./services/GroupService');
const { groupSchema, groupIdSchema } = require('./dbConnection/GroupSchema')

//get all group
groupRoute.get('/', async (req, res) => {
    Group.getGroups().then((groups) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(groups);
    }).catch((err) => {
        res.respond.notFoundError(err.message)
    });

});

//get group by id
groupRoute.get('/:id', validator.params(groupIdSchema), async (req, res) => {
    Group.getGroups(req.params.id).then((group) => {
        res.send(group);
    }).catch((err) => {
        res.respond.notFoundError(err.message);
    });
});

// create group
groupRoute.post('/', validator.body(groupSchema), async (req, res) => {
    Group.create(req.body).then((group) => {
        res.send(group);
    }).catch((err) => {
        res.respond.notFoundError(err.message);
    });
})

//update group
groupRoute.put('/:id', validator.params(groupIdSchema), validator.body(groupSchema), async (req, res) => {
    Group.update(req.body, req.params.id).then((group) => {
        res.send(group);
    }).catch((err) => {
        res.respond.notFoundError(err.message);
    });
});

//delete group
groupRoute.delete('/:id', validator.params(groupIdSchema), async (req, res) => {
    Group.delete(req.params.id).then((group) => {
        res.send(group);
    }).catch((err) => {
        res.respond.notFoundError(err.message);
    });
})

//add users to the group
groupRoute.post('/', async (req, res) => {
    const groupId = req.body.groupId;
    const userIds = req.body.userIds;
    Group.addUsersToGroup(groupId, userIds).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.respond.notFoundError(err.message);
    })
});


module.exports = groupRoute;