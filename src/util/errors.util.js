const ERRORS_NAME = [
  'InputValidationError',
  'ResourceNotFoundError',
  'UnauthorizedError',
]

const ERRORS = ERRORS_NAME.reduce((acc, className) => {
  acc[className] = ({
    [className]: class extends Error {
      constructor (msg, status) {
        super()
        this.message = msg
        this.status = status
        this.name = this.constructor.name
      }
    }
  })[className]

  return acc
}, {})

module.exports = ERRORS
