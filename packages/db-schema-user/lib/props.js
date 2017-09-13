const { Types } = require('@daub/db-schema')

module.exports.email = {
  type: String,
  required: true,
  trim: true,
  lowercase: true,
  match: /\S+@\S+\.\S+/,
  unique: true,
  validate: {
    async validator (email) {
      const dub = await this.constructor.findOne({ email })

      return dub
        ? Promise.reject('unique')
        : Promise.resolve()
    }
  }
}

module.exports.password = {
  type: String,
  required: true
}
