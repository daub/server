const jwt = require('jsonwebtoken')

async function login (ctx) {
  const { Account } = ctx.models
  const { body } = ctx.request

  const { secret } = ctx.config.jwt

  const { id } = await Account.login(body)

  const accessToken = jwt.sign({ id }, secret)

  ctx.status = 202
  ctx.body = { accessToken }
}

async function register (ctx) {
  const { Account } = ctx.models
  const { body } = ctx.request

  const doc = await Account.register(body)

  ctx.status = 204
  ctx.body = null
}

async function expose (ctx) {
  ctx.assert(ctx.state.account, 401)

  ctx.body = ctx.state.account
}

module.exports = {
  login,
  register,
  expose
}
