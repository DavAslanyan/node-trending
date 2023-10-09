const http = require('http')

const { HttpStatusCodesUtil } = require('../util')

class ErrorHandlerMiddleware {
  /**
   * @param {Object} error
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   * @description Initialize error handler.
   */
  static init (error, request, response, next) {
    const ERROR_CASE =
      ErrorHandlerMiddleware.ERROR_CASES[error.status] ||
      ErrorHandlerMiddleware.ERROR_CASES[error.code] ||
      ErrorHandlerMiddleware.ERROR_CASES[error.name] ||
      ErrorHandlerMiddleware.ERROR_CASES.DEFAULT

    const { status, code, message } = ERROR_CASE

    const result = { status, code, message: message || error.message, data: error.data }

    result.status === 500 && console.log('Case: ', error.status, error.code, error.name, error.message)

    response.status(result.status).json(result)
  }
}

ErrorHandlerMiddleware.ERROR_CASES = {
  InputValidationError: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
  },
  ResourceNotFoundError: {
    status: HttpStatusCodesUtil.NOT_FOUND,
    code: http.STATUS_CODES[HttpStatusCodesUtil.NOT_FOUND],
    message: 'Not Found'
  },
  UnauthorizedError: {
    status: HttpStatusCodesUtil.UNAUTHORIZED,
    code: http.STATUS_CODES[HttpStatusCodesUtil.UNAUTHORIZED],
    message: 'Unauthorized'
  },
  DEFAULT: {
    status: HttpStatusCodesUtil.INTERNAL_SERVER_ERROR,
    code: http.STATUS_CODES[HttpStatusCodesUtil.INTERNAL_SERVER_ERROR],
    message: 'The server encountered an internal error. Try again later.'
  }
}

module.exports = ErrorHandlerMiddleware
