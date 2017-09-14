const Router = require('koa-router')

const {
  create
} = require('./controller')

const errorHandler = require('./error-handler')

const router = new Router({
  prefix: '/users'
})

router.use(errorHandler)

router.post('/', create)

module.exports = router
