const app = require('express')()

const auth = require('./auth.api')
const balance = require('./balance.api')

/**
 * @description Add required APIs.
 */

app.use('/auth', auth)
app.use('/balance', balance)


module.exports = app
