const Schema = require('@daub/db-schema')

const props = require('./props')

const schema = new Schema(props)

schema.methods.destroy = function () {
  return this.constructor
    .findByIdAndRemove(this._id)
}

schema.virtual('id').get(function(){
  return this._id.toHexString();
})

schema.set('timestamps', true)

schema.set('toJSON', {
  virtuals: true,
  transform (doc, ret) {
    delete ret._id
  }
})

module.exports = schema
