const Koa = require('koa')

const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')

const authorization = require('./middleware/authorize')

const app = new Koa()

if (app.env === 'development') {
  app.use(logger())
}

app.use((ctx, next) => {
  ctx.assert(ctx.models, 501)
  return next()
})

const authorize = authorization
  .unless({
    method: 'POST',
    path: ['/users', '/sessions']
  })

app.use(authorize)

app.use(bodyParser())

module.exports = app
