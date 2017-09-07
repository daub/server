const Schema = require('@daub/db-schema')

const props = require('./props')

const sensible = require('./sensible')

const schema = new Schema(props)

schema.plugin(sensible)

schema.methods.destroy = function () {
  return this.constructor
    .findByIdAndRemove(this._id)
}

module.exports = schema
