const account = require('@daub/api-account')

const app = require('./app')
const api = require('./api')

app.use(account.routes())
app.use(account.verify())

app.use(api)

module.exports = app
