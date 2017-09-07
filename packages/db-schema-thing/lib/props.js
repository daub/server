const URL = require('./url')

module.exports.name = {
  type: String,
  required: true
}

module.exports.url = {
  type: URL
}

module.exports.alternateName = String
module.exports.description = String
module.exports.disambiguatingDescription = String
