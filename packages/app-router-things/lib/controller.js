async function findOne (ctx) {
  const { Thing } = ctx.models
  const { id } = ctx.params

  const doc = await Thing.findById(id)

  ctx.body = doc
}

async function create (ctx) {
  const { Thing } = ctx.models
  const { body } = ctx.request

  const doc = await Thing.create(body)
  const location = `/things/${doc._id}`

  ctx.set({ location })
  ctx.body = null
}

async function removeById (ctx) {
  const { Thing } = ctx.models
  const { id } = ctx.params

  const doc = await Thing.findByIdAndRemove(id)

  ctx.status = 204
  ctx.body = null
}

async function findAll (ctx) {
  const { Thing } = ctx.models

  ctx.body = await Thing.find({})
}

module.exports = {
  findOne,
  findAll,
  create,
  removeById
}
