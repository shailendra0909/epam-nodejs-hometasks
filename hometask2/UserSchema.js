const Joi = require('joi');

const userSchema = Joi.object().keys({
    id: Joi.string(),
    login: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}/).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean()
});

const userPutSchema = Joi.object().keys({
    id: Joi.string(),
    login: Joi.string(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}/),
    age: Joi.number().min(4).max(130),
    isDeleted: Joi.boolean()
});

const userIdSchema = Joi.object().keys({
    id: Joi.string().required()
})


module.exports = { userSchema, userIdSchema, userPutSchema };