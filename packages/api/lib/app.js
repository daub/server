const Koa = require('koa')

const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt')

const app = new Koa()

if (app.env === 'development') {
  app.use(logger())
}

app.use((ctx, next) => {
  ctx.assert(ctx.models, 501)
  return next()
})

const auth = jwt({
    secret: 'secret',
    debug: true
  })
  .unless({
    method: 'POST',
    path: ['/users', '/sessions']
  })

app.use(auth)

app.use(bodyParser())

module.exports = app
