const Router = require('koa-router')

const router = new Router({
  prefix: '/things'
})

router
  .get('/', find)
  .post('/', ctx => ctx.body = 'post')

router
  .get('/:id', ctx => ctx.body = ctx.params.id)

async function find (ctx) {
  const { Thing } = ctx.models

  ctx.body = await Thing.find({})
}

module.exports = router
