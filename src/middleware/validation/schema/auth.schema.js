const Joi = require('joi')

class AuthSchema {}

AuthSchema.authSchema = Joi.object({
    body: Joi.object({
        PHPSESSID: Joi.string().required(),
    }).required()
})


module.exports = AuthSchema
