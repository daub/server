const bcrypt = require('bcrypt')

const Schema = require('@daub/db-schema')

const props = require('./props')

const schema = new Schema(props)

schema.set('timestamps', true)

schema.methods.destroy = function () {
  return this.constructor
    .findByIdAndRemove(this._id)
}

schema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  return bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) return next(err)
    this.password = hash
    next()
  })
})

module.exports = schema
