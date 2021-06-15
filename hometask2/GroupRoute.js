
const expess = require('express');
const validator = require('express-joi-validation').createValidator({})
const groupRoute = expess.Router();

const groupService = require('./services/GroupService');
const { groupSchema, groupIdSchema } = require('./dbConnection/GroupSchema')

//get all group
groupRoute.get('/', async (req, res) => {
    groupService.getGroups().then((groups) => {
        res.send(groups);
    }).catch((err) => {
        res.respond.notFoundError(err.message, { method: 'group:getAllGroup' })
    });

});

//get group by id
groupRoute.get('/:id', validator.params(groupIdSchema), async (req, res) => {
    groupService.getGroups(req.params.id).then((group) => {
        res.send(group);
    }).catch((err) => {
        res.respond.notFoundError(err.message, { method: 'group:getGroup', args: { id: req.params.id } });
    });
});

// create group
groupRoute.post('/', validator.body(groupSchema), async (req, res) => {
    groupService.create(req.body).then((group) => {
        res.send(group);
    }).catch((err) => {
        res.respond.notFoundError(err.message, { method: 'group:createGroup' });
    });
})

//update group
groupRoute.put('/:id', validator.params(groupIdSchema), validator.body(groupSchema), async (req, res) => {
    groupService.update(req.body, req.params.id).then((group) => {
        res.send(group);
    }).catch((err) => {
        res.respond.notFoundError(err.message, { method: 'group:updateGroup', args: { id: req.params.id } });
    });
});

//delete group
groupRoute.delete('/:id', validator.params(groupIdSchema), async (req, res) => {
    groupService.delete(req.params.id).then((group) => {
        res.send(group);
    }).catch((err) => {
        res.respond.notFoundError(err.message, { method: 'group:deleteGroup', args: { id: req.params.id } });
    });
})

//add users to the group
groupRoute.post('/', async (req, res) => {
    const groupId = req.body.groupId;
    const userIds = req.body.userIds;
    groupService.addUsersToGroup(groupId, userIds).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.respond.notFoundError(err.message, { method: 'group:addUserToGroup' });
    })
});


module.exports = groupRoute;