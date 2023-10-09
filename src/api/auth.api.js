const router = require('express').Router()
const { ValidationMiddleware, AsyncMiddlewareWrapper } = require('../middleware')
const {AuthValidation}=ValidationMiddleware
const AuthService = require('../service/auth.service')

router.post('/',
    AuthValidation.validateAuthArgs,
    AsyncMiddlewareWrapper.asyncMiddlewareWrapper(AuthService.authenticate)
)

router.post('/log-out',
    AsyncMiddlewareWrapper.asyncMiddlewareWrapper(AuthService.logOut)
)

module.exports = router
