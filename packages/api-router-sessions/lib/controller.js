const jwt = require('jsonwebtoken')

async function create (ctx) {
  const { User } = ctx.models
  const { body } = ctx.request

  const { id } = await User.login(body)

  const location = `/users/${id}`

  const accessToken = jwt.sign({ id }, 'secret')

  ctx.set({ location })
  ctx.status = 202
  ctx.body = { accessToken }
}

module.exports = {
  create
}
