const { assign } = Object

const defaults = {
  virtuals: true
}

module.exports = (schema, options) => {
  const { virtuals } = assign({}, defaults, options)

  schema.virtual('id').get(function(){
    return this._id.toHexString();
  })

  schema.set('toJSON', {
    virtuals,
    transform (doc, ret) {
      if (!virtuals) ret.id = doc._id.toHexString()
      delete ret._id
    }
  })
}
