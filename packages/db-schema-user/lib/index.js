const Schema = require('@daub/db-schema')

const props = require('./props')

const sensible = require('./sensible')

const schema = new Schema(props)

schema.plugin(sensible)

schema.virtual('password', {
  ref: 'Password',
  localField: '_id',
  foreignField: 'owner',
  justOne: true
})

schema.methods.destroy = function () {
  return this.constructor
    .findByIdAndRemove(this._id)
}

schema.statics.register = async function (body = {}) {
  const { password } = body

  const User = this
  const Password = this.model('Password')

  const { id } = await User.create(body)

  const rollback = async (err) => {
    // what if rollback fail?
    await User.findByIdAndRemove(id)
    return Promise.reject(err)
  }

  return Password
    .create({ owner: id, password })
    .catch(rollback)
    .then(() => ({ id }))
}

module.exports = schema
