const Koa = require('koa')

const bodyParser = require('koa-bodyparser')

const thingsRouter = require('@daub/api-router-things')

const app = new Koa()

app.use(bodyParser())

app.use(thingsRouter.routes())

module.exports = app
