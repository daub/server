const jwt = require('jsonwebtoken')

const getToken = str => {
  const err = new Error('No valid token')

  const schema = /^Bearer/i

  if (!str || !schema.test(str)) throw err

  const token = str.split(' ').pop()

  if (!token) throw err

  return token
}

function fn () {
  function verify (ctx, next) {
    try {
      const token = getToken(ctx.headers.authorization)
      ctx.state.user = jwt.verify(token, 'secret')
      return next()
    } catch (err) {
      ctx.status = 401
    }
  }

  return verify
}

module.exports = fn
