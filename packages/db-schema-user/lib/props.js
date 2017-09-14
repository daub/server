const { Types } = require('@daub/db-schema')

module.exports.email = {
  type: String,
  unique: true,
  required: true,
  trim: true,
  lowercase: true,
  match: /\S+@\S+\.\S+/,
  validate: {
    async validator (email) {
      const dub = await this.constructor.findOne({ email })

      return dub
        ? Promise.reject('unique')
        : Promise.resolve()
    }
  }
}
