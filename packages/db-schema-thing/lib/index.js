const { Schema } = require('mongoose')

const props = require('./props')

const URL = require('./url')
Schema.Types.URL = URL

const schema = new Schema(props)

schema.methods.destroy = function () {
  return this.constructor
    .findByIdAndRemove(this._id)
}

module.exports = schema
