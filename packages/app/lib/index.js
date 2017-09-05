const Koa = require('koa')

const bodyParser = require('koa-bodyparser')

const Db = require('@daub/db')

const app = new Koa()

const db = new Db()

app.context.models = db.models

app.use(bodyParser())

module.exports = app
module.exports.db = db
