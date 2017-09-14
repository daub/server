async function create (ctx) {
  const { User } = ctx.models
  const { body } = ctx.request

  const doc = await User.register(body)
  const location = `/users/${doc.id}`

  ctx.set({ location })
  ctx.body = null
}

module.exports = {
  create
}
