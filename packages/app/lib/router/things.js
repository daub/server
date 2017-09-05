const Router = require('koa-router')

const router = new Router({
  prefix: '/things'
})

router
  .get('/', ctx => ctx.body = 'get')
  .post('/', ctx => ctx.body = 'post')

router
  .get('/:id', ctx => ctx.body = ctx.params.id)

module.exports = router
