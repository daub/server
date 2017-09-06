const { URL } = require('url')

module.exports.name = {
  type: String,
  required: true
}

module.exports.url = {
  type: String,
  validate: {
    validator (v) {
      try {
        v = new URL(v)
      } catch (err) {
        return false
      }
    },
    reason: 'invalid'
  }
}

module.exports.alternateName = String
module.exports.description = String
module.exports.disambiguatingDescription = String
