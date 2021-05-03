
const User = require('./UserModel');
const Group = require('./GroupModel');

User.belongsToMany(Group, { through: 'User_Group' });
Group.belongsToMany(User, { through: 'User_Group' });

module.exports = { User, Group }