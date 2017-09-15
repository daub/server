const jwt = require('jsonwebtoken')

async function login (ctx) {
  const { User } = ctx.models
  const { body } = ctx.request

  const { id } = await User.login(body)

  const accessToken = jwt.sign({ id }, 'secret')

  ctx.status = 202
  ctx.body = { accessToken }
}

async function register (ctx) {
  const { User } = ctx.models
  const { body } = ctx.request

  const doc = await User.register(body)

  ctx.status = 204
  ctx.body = null
}

async function expose (ctx) {
  ctx.assert(ctx.state.user, 401)

  ctx.body = ctx.state.user
}

module.exports = {
  login,
  register,
  expose
}
