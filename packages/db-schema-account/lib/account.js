const { encrypt, compare } = require('./bcrypt')

class Account {
  async verify (password) {
    const Account = this.constructor

    const account = await Account
      .findById(this._id)
      .select('password')

    const same = await compare(password, account.password)

    if (same) return this

    return reject({
      password: { valid: false }
    })
  }
  static async login (body = {}) {
    const { email, password } = body

    const account = await this
      .findOne({ email })

    if (account) return account.verify(password)

    return reject({
      email: { exists: false }
    })
  }
}

Account.install = function (schema) {
  schema.pre('save', function (next) {
    if (!this.isModified('password')) return next()

    const keep = hash => {
      this.password = hash
      next()
    }

    encrypt(this.password)
      .then(keep)
      .catch(next)
  })
}

async function reject (errors) {
  const err = new Error('Not Authorized')
  err.errors = errors
  return Promise.reject(err)
}

module.exports = Account
