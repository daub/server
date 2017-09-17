const config = require('config')

const jwt = require('koa-jwt')

const db = require('@daub/db')

const auth = require('@daub/server-auth')

const app = require('./app')

app.db = db

app.context.config = config.get('app')

app.context.models = db.models
db.connect(config.get('db.url'))

app.use(auth(app))

const secret = config.get('app.jwt.secret')

app.use(jwt({ secret }))

module.exports = app
