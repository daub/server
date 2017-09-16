const config = require('config')

const db = require('@daub/db')

const account = require('@daub/api-account')

const app = require('./app')
const api = require('./api')

app.context.config = config.get('app')

app.context.models = db.models
db.connect(config.get('db.url'))

app.use(account.routes())
app.use(account.verify())

app.use(api)

module.exports = app
