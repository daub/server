const compose = require('koa-compose')

const things = require('@daub/api-router-things')

const routers = [
  things
]

const expose = router => router.routes()

module.exports = compose(routers.map(expose))
