const Koa = require('koa')

const bodyParser = require('koa-bodyparser')

const db = require('@daub/db')

const app = new Koa()

app.context.models = db.models

app.use(bodyParser())

module.exports = app
module.exports.db = db
