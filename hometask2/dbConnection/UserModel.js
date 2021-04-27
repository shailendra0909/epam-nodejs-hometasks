const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('./db');


const User = sequelize.define("user", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        primaryKey: true
    },
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    age: DataTypes.INTEGER
}, {
    freezeTableName: true
});

User.sync({ alter: true });

module.exports = User;
