const Router = require('koa-router')

const {
  create,
  read,
  update,
  findAll,
  removeById
} = require('./controller')

const router = new Router({
  prefix: '/things'
})

router
  .get('/', findAll)
  .post('/', create)

router
  .get('/:id', read)
  .put('/:id', update)
  .delete('/:id', removeById)



module.exports = router
