const Router = require('koa-router')

const {
  create,
  read,
  update,
  destroy,
  findById,
  findAll
} = require('./controller')

const errorHandler = require('./error-handler')

const router = new Router({
  prefix: '/things'
})

router.use(errorHandler)

router
  .get('/', findAll)
  .post('/', create)

router
  .use('/:id', findById)
  .get('/:id', read)
  .put('/:id', update)
  .delete('/:id', destroy)

module.exports = router
