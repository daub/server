const bcrypt = require('bcrypt-nodejs')

const Schema = require('@daub/db-schema')

const props = require('./props')

const sensible = require('./sensible')

const schema = new Schema(props)

schema.plugin(sensible)

schema.methods.destroy = function () {
  return this.constructor
    .findByIdAndRemove(this._id)
}

schema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err)

    this.password = hash
    next()
  })
})

schema.statics.login = async function (body={}) {
  const { email, password } = body

  const Account = this

  const account = await Account
    .findOne({ email })
    .select('password')
  // TODO: normal errors

  if (!account) throw new Error('Not Authorized')

  return account
    .verifyPassword(password)
}

schema.methods.verifyPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, res) => {
      if (err) return reject(err)
      if (res) return resolve(this)

      const error = new Error('Not Authorized')
      reject(error)
    })
  })
}

module.exports = schema
