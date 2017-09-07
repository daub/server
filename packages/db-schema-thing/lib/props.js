const { Types } = require('@daub/db-schema')

module.exports.name = {
  type: String,
  required: true
}

module.exports.url = {
  type: Types.URL
}

module.exports.alternateName = String
module.exports.description = String
module.exports.disambiguatingDescription = String
