const jwt = require('jsonwebtoken')

const unless = require('koa-unless')

const authorize = (ctx, next) => {
  // const { secret } = ctx.config.jwt
  const secret = 'secret'

  const { authorization } = ctx.headers
  const [ schema, token ] = authorization.split(' ')

  if (schema.toLowerCase() !== 'bearer') throw new Error('Not authorized')

  try {
    ctx.state.user = jwt.verify(token, secret)
    return next()
  } catch (err) {
    throw err
  }
}

authorize.unless = unless

module.exports = authorize
