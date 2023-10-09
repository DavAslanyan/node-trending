const { ErrorsUtil } = require('../../../util')
const { InputValidationError  } = ErrorsUtil

class ValidatorUtil {
  static validate (args, joiSchema, next) {
    const { error } = joiSchema.validate(args, ValidatorUtil.OPTIONS)
    if (error) {
      const msg = error && error.details && error.details[0] && error.details[0].message
      return next(new InputValidationError(msg))
    }
    next()
  }
}

ValidatorUtil.OPTIONS = {
  abortEarly: true,
  allowUnknown: false,
  convert: true
}

module.exports = ValidatorUtil
