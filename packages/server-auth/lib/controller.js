const jwt = require('jsonwebtoken')

async function login (ctx) {
  const { User } = ctx.models
  const { body } = ctx.request

  const { secret } = ctx.config.jwt

  const { id } = await User.login(body)

  const accessToken = jwt.sign({ id }, secret)

  ctx.status = 202
  ctx.body = { accessToken }
}

async function register (ctx) {
  const { User } = ctx.models
  const { body } = ctx.request

  const doc = await User.create(body)

  ctx.status = 204
  ctx.body = null
}

async function verify (ctx) {
  try {
    const { secret } = ctx.config.jwt
    const token = getToken(ctx.headers.authorization)
    const payload = jwt.verify(token, secret)
    ctx.links.self = `/persons/${payload.id}`
    ctx.body = null
  } catch (err) {
    ctx.throw(401)
  }
}

function getToken(str) {
  const err = new Error('No valid token')

  const schema = /^Bearer/i

  if (!str || !schema.test(str)) throw err

  const token = str.split(' ').pop()

  if (!token) throw err

  return token
}

module.exports = {
  login,
  register,
  verify
}
