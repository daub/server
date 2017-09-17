const router = require('./router')

const userSchema = require('@daub/db-schema-user')

module.exports = ({ db }) => {
  db.model('User', userSchema)

  return router.routes()
}
