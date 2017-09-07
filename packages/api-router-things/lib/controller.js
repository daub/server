async function create (ctx) {
  const { Thing } = ctx.models
  const { body } = ctx.request

  const doc = await Thing.create(body)
  const location = `/things/${doc._id}`

  ctx.set({ location })
  ctx.body = null
}

async function read (ctx) {
  const { thing } = ctx.state

  ctx.body = thing
}

async function update (ctx) {
  const { thing } = ctx.state
  const { body } = ctx.request

  await thing
    .set(body)
    .save()

  ctx.status = 204
  ctx.body = null
}

async function destroy (ctx) {
  const { thing } = ctx.state

  await thing.destroy()

  ctx.status = 204
  ctx.body = null
}

async function findAll (ctx) {
  const { Thing } = ctx.models

  ctx.body = await Thing.find({})
}

async function findById (ctx, next) {
  const { Thing } = ctx.models
  const { id } = ctx.params

  const thing = await Thing.findById(id)

  if (!thing) throw new Error('Not Found')

  ctx.state.thing = thing

  return next()
}

module.exports = {
  create,
  read,
  update,
  destroy,
  findAll,
  findById
}
