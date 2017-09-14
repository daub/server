const Router = require('koa-router')

const {
  login
} = require('./controller')

const errorHandler = require('./error-handler')

const router = new Router({
  prefix: '/auth'
})

router.use(errorHandler)

router.post('/login', login)

module.exports = router
