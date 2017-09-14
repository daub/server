async function create (ctx) {
  const { User } = ctx.models
  const { body } = ctx.request

  const doc = await User.login(body)
  const location = `/users/${doc.id}`

  ctx.set({ location })
  ctx.set({ 'Access-Token': Math.random() })
  ctx.body = null
}

module.exports = {
  create
}
