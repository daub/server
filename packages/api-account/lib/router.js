const Router = require('koa-router')

const {
  login,
  register,
  expose
} = require('./controller')

const verify = require('./middleware/verify')

const errorHandler = require('./error-handler')

const router = new Router({
  prefix: '/account'
})

router.use(errorHandler)

router.post('/login', login)
router.post('/register', register)

router.get('/', verify(), expose)

module.exports = router
