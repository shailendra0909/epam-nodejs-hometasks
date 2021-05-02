const { v4: uuidv4 } = require('uuid');
const {Group} = require('../dbConnection/models/index');


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
        const group = await Group.deleteById(groupId);
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