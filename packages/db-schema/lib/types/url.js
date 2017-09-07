const url = require('url')

const {
  SchemaType,
  CastError
} = require('mongoose')

class URL extends SchemaType {
  constructor (key, options) {
    super(key, options, 'URL')
  }
  cast (v) {
    if (!v) return null

    try {
      return new url
        .URL(v)
        .toString()
    } catch (err) {
      throw new CastError('URL', err.message, this.path, 'validURL')
    }
  }
}

// Mimic Mongoose types
URL.schemaName = 'URL'

module.exports = URL
