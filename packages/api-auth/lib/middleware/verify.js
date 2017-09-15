const jwt = require('jsonwebtoken')

const unless = require('koa-unless')

const getToken = str => {
  const err = new Error('No valid token')

  const schema = /^Bearer/i

  if (!str || !schema.test(str)) throw err

  const token = str.split(' ').pop()

  if (!token) throw err

  return token
}

function fn (options = {}) {
  const { passThrough } = options

  function verify (ctx, next) {
    try {
      const token = getToken(ctx.headers.authorization)
      ctx.state.user = jwt.verify(token, 'secret')
      return next()
    } catch (err) {
      if (passThrough) return next()

      ctx.status = 401
    }
  }

  verify.unless = unless

  return verify
}

module.exports = fn
