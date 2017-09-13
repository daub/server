const { Types } = require('@daub/db-schema')

module.exports.email = {
  type: String,
  required: true
}

module.exports.password = {
  type: String,
  required: true
}
