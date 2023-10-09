const router = require('express').Router()

const { AsyncMiddlewareWrapper } = require('../middleware')
const BalanceService = require('../service/balance.service')

router.get('/',
    AsyncMiddlewareWrapper.asyncMiddlewareWrapper(BalanceService.getBalance)
)
module.exports = router
