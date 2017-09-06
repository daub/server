const { Schema } = require('mongoose')

const props = require('./props')

const schema = new Schema(props)

schema.methods.destroy = function () {
  return this.constructor
    .findByIdAndRemove(this._id)
}

module.exports = schema
