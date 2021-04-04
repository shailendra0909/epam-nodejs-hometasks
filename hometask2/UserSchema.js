const Joi = require('joi');

const userSchema = Joi.object({
    id: Joi.string(),
    login: Joi.string().required().error((errors) => new Error("'login' is required field")),
    password: Joi.string().required().error((errors) => new Error("'password' is required field")),
    age: Joi.date().default(Date.now).required().error((errors) => new Error("'age' is required field")),
    isDeleted: Joi.boolean().default(false)
});


module.exports = userSchema;