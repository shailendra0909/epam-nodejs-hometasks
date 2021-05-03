const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');


const Group = sequelize.define("groups", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    permissions: {
        type: DataTypes.ARRAY(DataTypes.ENUM({
            values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
        })),
        defaultValue: ['READ']
    }
}, {
    freezeTableName: true
});


module.exports = Group;