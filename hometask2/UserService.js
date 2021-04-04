const { v4: uuidv4 } = require('uuid');

const { userSchema } = require('./UserSchema');


let userList = [];

const getUser = async (id) => {
    const users = userList.filter((user) => {
        if (user.id === id) {
            return true;
        }

        return false;
    });

    if (!users.length) {
        throw new Error(`User not found with given id: ${id}`)
    }
    return processUser(users[0]);
}

const addUser = async (user) => {
    const { error } = userSchema.validate(user);
    if (error) {
        throw error;
    }

    const newUser = { id: uuidv4(), isDeleted: false, ...user }
    userList.push(newUser);
    return processUser(newUser);
}

const updateUser = async (id, newUser) => {
    const userFound = false;
    let usr = null;
    userList = userList.map((user) => {
        if (user.id === id) {
            userFound = true;
            usr = { ...newUser, ...user };
            return usr;
        }
    })
    if (!userFound) {
        throw new Error(`User not found with given id: ${id}`)
    }

    return processUser(usr);
}

const deleteUser = async (id) => {
    const userFound = false;
    let usr = null;
    userList = userList.filter((user) => {
        if (id === user.id) {
            userFound = true;
            user.isDeleted = true;
            usr = user
        }
        return user.id !== id;
    });
    if (!userFound) {
        throw new Error(`User not found with given id: ${id}`)
    }
    return processUser(usr);
}

const processUser = (user) => {
    const newUser = { ...user };

    delete newUser.isDeleted;
    delete newUser.password;

    return newUser;
}

module.exports = {
    getUser,
    addUser,
    deleteUser,
    updateUser
}