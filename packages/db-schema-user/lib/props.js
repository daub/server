const { Types } = require('@daub/db-schema')

module.exports.email = {
  type: String,
  required: true,
  trim: true,
  lowercase: true,
  match: /\S+@\S+\.\S+/
}

module.exports.password = {
  type: String,
  required: true
}
