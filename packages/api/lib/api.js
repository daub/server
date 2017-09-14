const compose = require('koa-compose')

const things = require('@daub/api-router-things')
const users = require('@daub/api-router-users')
const sessions = require('@daub/api-router-sessions')

const routers = [
  things,
  users,
  sessions
]

const expose = router => router.routes()

module.exports = compose(routers.map(expose))
