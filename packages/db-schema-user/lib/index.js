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

schema.statics.login = async function (body={}) {
  const { email, password } = body

  const User = this
  const Password = this.model('Password')

  const user = await User
    .findOne({ email })
    .populate('password')

  // TODO: normal errors

  if (!user) throw new Error('Not Authorized')

  const verified = await user.password.compare(password)

  if (verified) return user

  throw new Error('Not Authorized')
}

module.exports = schema
