const Router = require('koa-router')

const {
  create,
  findAll,
  findOne,
  removeById
} = require('./controller')

const router = new Router({
  prefix: '/things'
})

router
  .get('/', findAll)
  .post('/', create)

router
  .get('/:id', findOne)
  .delete('/:id', removeById)

module.exports = router
