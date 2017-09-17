const Router = require('koa-router')

const {
  login,
  register,
  verify
} = require('./controller')

const errorHandler = require('./error-handler')

const router = new Router({
  prefix: '/auth'
})

router.use(errorHandler)

router.post('/login', login)
router.post('/register', register)
router.get('/verify', verify)

module.exports = router
