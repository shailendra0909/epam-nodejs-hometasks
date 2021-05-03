const { v4: uuidv4 } = require('uuid');
const { Group, User } = require('../dbConnection/models/index');
const sequelize = require('../dbConnection/db');


const getGroups = async () => {
    const groups = await Group.findAll();
    return groups;
}

const getGroup = async (groupId) => {
    try {
        const group = await Group.findById(groupId);
        return group;
    } catch (err) {
        throw new Error(`group with id ${groupId} not found`, err);
    }
}

const createGroup = async (group) => {
    try {
        const newGroup = await Group.create({ ...group, id: uuidv4 });
        return newGroup;
    } catch (err) {
        throw new Error(`could not create group.`, err);
    }
}

const deleteGroup = async (groupId) => {
    try {
        await sequelize.transaction(async (t) => {
            const users = await sequelize.query('select * from User_Group where groupId=${groupId}', { transaction: t });
            if (users.length > 0) {
                throw new Error(`Group with id ${groupId} can not be deleted.`)
            }
            await Group.deleteById(groupId, { transaction: t });
        })
        return group;
    } catch (err) {
        throw new Error(`could not delete group with id ${groupId}`, err);
    }
}

const updateGroup = async (group) => {
    try {
        const updatedGroup = Group.update({ ...group }, { where: { id: group.id } });
        return updatedGroup;
    } catch (err) {
        throw new Error(`could not update group with id ${groupId}`, err);
    }
}

const addUsersToGroup = (groupId, userIds) => {
    try {
        const users = userIds.map((userId) => {
            return User.findOne({ where: { id: userId } });
        });
        const dbUsers = await Promise.all(users);
        dbUsers.forEach((user, index) => {
            if (user === null) {
                throw new Error(`user with id ${userIds[index]} is not found`);
            }
        });
        const group = await Group.findOne({ where: { id: groupId } });
        if (group == null) {
            throw new Error(`group with id ${groupId} is not found`);
        }
        //insert into table
        await sequelize.transaction(async (t) => {
            userIds.forEach(userId => {
                await sequelize.query('insert into User_Group values (${userId}, ${groupId})', { transaction: t });
            });
        })
    } catch (error) {
        throw new Error(`Could not assing group ${groupId} to the users ${userIds}`);
    }
}