const config = require('config')

const jwt = require('koa-jwt')

const app = require('./packages/server')
const auth = require('./packages/server-auth')

const { db } = app

const port = config.get('app.port')

app.context.config = config.get('app')

app.use(auth(app))

const secret = config.get('app.jwt.secret')

app.use(jwt({ secret }))

app.listen(port, (err) => {
  db.connect(config.get('db.url'))
  console.log(`Server listening to port ${port}`)
})
