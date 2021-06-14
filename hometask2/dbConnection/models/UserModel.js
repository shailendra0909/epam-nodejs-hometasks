const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');


const User = sequelize.define("users", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true
    },
    password: DataTypes.STRING,
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    age: DataTypes.INTEGER
}, {
    freezeTableName: true
});

module.exports = User;
