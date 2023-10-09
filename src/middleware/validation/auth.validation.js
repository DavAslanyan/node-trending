const { AuthSchema } = require('./schema')

const ValidatorUtil = require('./util/validator.util')

class AuthValidation {
  static validateAuthArgs (request, response, next) {
    const args = { body: request.body }
    ValidatorUtil.validate(args, AuthSchema.authSchema, next)
  }
}

module.exports = AuthValidation
