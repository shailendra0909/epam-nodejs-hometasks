const { v4: uuidv4 } = require('uuid');
const sequelize = require("sequelize");
const { omit } = require('lodash');
const { User } = require('../dbConnection/models/index');

const REJECTED_KEYS = ['isDeleted', 'createdAt', 'password', 'updatedAt'];
const {Op} = sequelize;

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
        throw new Error(`User not found with given id: ${userId}`)
    }
    return processUser(users[0]);
}

const getUserWithCredentials = async (loginName) => {
    const users = await User.findAll({
        where: {
            login: {
                [Op.eq]: loginName
            }
        }
    });
    if (users && !users.length) {
        throw new Error(`User not found with given id: ${loginName}`)
    }
    return users[0];
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
        await sequelize.transaction(async (t) => {
            const usr = await getUser(userId, { transaction: t });
            const updatedUser = await User.update({ isDeleted: true }, {
                where: {
                    id: userId
                }
            }, { transaction: t });
            if (!updatedUser) {
                throw new Error(`User not found with given id: ${userId}`)
            }
            sequelize.query('delete * from User_Group where id=${userId}', { transaction: t });
            return processUser(usr);
        });
    }
    catch (error) {
        throw error;
    }

}

const getAutoSuggestUsers = async (loginSubstring, limit) => {
    const users = await User.findAll({ plain: true }).then((users) => {
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
    getAutoSuggestUsers,
    getUserWithCredentials
}