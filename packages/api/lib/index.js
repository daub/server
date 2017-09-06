const Koa = require('koa')

const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')

const api = require('./api')

const app = new Koa()

if (app.env === 'development') {
  app.use(logger())
}

app.use((ctx, next) => {
  ctx.assert(ctx.models, 501)
  return next()
})

app.use(bodyParser())

app.use(api)

module.exports = app
