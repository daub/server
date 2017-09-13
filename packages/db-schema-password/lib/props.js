const { Types } = require('@daub/db-schema')

module.exports.password = {
  type: String,
  match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  required: true
}
