const { object } = require('joi');
const { v4: uuidv4 } = require('uuid');




let userList = [];

const getAllUser = async () => {
    return userList.map((user) => {
        return processUser(user);
    })
}

const getUser = async (id) => {
    const users = userList.filter((user) => {
        if (user.id === id) {
            return true;
        }
        return false;
    });

    if (!users.length || users[0].isDeleted === true) {
        throw new Error(`User not found with given id: ${id}`)
    }
    return processUser(users[0]);
}

const addUser = async (user) => {
    const newUser = { id: uuidv4(), isDeleted: false, ...user }
    userList.push(newUser);
    console.log(JSON.stringify(userList))
    return processUser(newUser);
}

const updateUser = async (id, newUser) => {
    console.log(newUser);
    let userFound = false;
    let usr = null;
    userList = userList.map((user) => {
        if (user.id === id) {
            userFound = true;
            usr = { ...user, ...newUser };
            console.log(user);
            console.log(usr);
            return usr;
        }
        return user;
    });
    if (!userFound) {
        throw new Error(`User not found with given id: ${id}`)
    }
    console.log(JSON.stringify(userList))
    return processUser(usr);
}

const deleteUser = async (id) => {
    let userFound = false;
    let usr = null;
    userList = userList.filter((user) => {
        if (id === user.id) {
            userFound = true;
            user.isDeleted = true;
            usr = user;
            return true;
        }
        return true;
    });
    if (!userFound) {
        throw new Error(`User not found with given id: ${id}`)
    }
    console.log(JSON.stringify(userList))
    return processUser(usr);
}

const getAutoSuggestUsers = async (loginSubstring, limit) => {
    return userList.filter((user) => {
        if (user.login.includes(loginSubstring)) {
            return true;
        }
        return true;
    }).sort().slice(0, limit);
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
    updateUser,
    getAllUser,
    getAutoSuggestUsers
}