const Joi = require('joi');
const { GroupPermission } = require('./GroupConstants')

const groupSchema = Joi.object().keys({
    id: Joi.string(),
    name: Joi.string().required(),
    permissions: Joi.string().valid(...Object.keys(GroupPermission))
});

const groupIdSchema = Joi.object().keys({
    id: Joi.string().required()
})


module.exports = { groupSchema, groupIdSchema };