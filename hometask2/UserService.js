const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");
const { omit } = require('lodash');
const User = require('./dbConnection/UserModel');

const REJECTED_KEYS = ['isDeleted', 'createdAt', 'password', 'updatedAt'];

const getAllUser = async () => {
    const users = await User.findAll();
    return users.filter((user) => !user.isDeleted).map((user) => {
        return processUser(user);
    })
}

const getUser = async (userId) => {
    const users = await User.findAll({
        where: {
            id: {
                [Op.eq]: userId
            }
        }
    });
    if (!users.length || users[0].isDeleted === true) {
        throw new Error(`User not found with given id: ${id}`)
    }
    return processUser(users[0]);
}

const addUser = async (user) => {
    const newUser = await User.create({
        id: uuidv4(),
        isDeleted: false,
        ...user
    });
    return processUser(newUser);
}

const updateUser = async (userId, newUser) => {
    let updatedUser;
    try {
        updatedUser = await User.update({ ...newUser }, {
            where: {
                id: userId
            }
        });
    }
    catch (excption) {
        throw new Error(`User not found with given id: ${userId}`)
    }
    return processUser(newUser);
}

const deleteUser = async (userId) => {
    try {
        const usr = await getUser(userId);
        const updatedUser = await User.update({ isDeleted: true }, {
            where: {
                id: userId
            }
        });
        if (!updatedUser) {
            throw new Error(`User not found with given id: ${userId}`)
        }
        return processUser(usr);
    }
    catch (error) {
        console.log('error in deleting the user!!')
    }

}

const getAutoSuggestUsers = async (loginSubstring, limit) => {
    const users = await User.findAll().then((users) => {
        return users.filter((user) => {
            if (user.login.includes(loginSubstring) && !user.isDeleted) {
                return true;
            }
            return false;
        }).sort().slice(0, limit);

    });

    const mappedUsers = users.map((user) => processUser(user));
    return mappedUsers;
}
//remove unwanted attributes
const processUser = (user) => {
    const newUser = { ...user };
    return omit(newUser, REJECTED_KEYS);
}

module.exports = {
    getUser,
    addUser,
    deleteUser,
    updateUser,
    getAllUser,
    getAutoSuggestUsers
}