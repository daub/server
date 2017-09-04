const mongoose = require('@daub/mongoose')

const thingSchema = mongoose.Schema({ name: String })
const Thing = mongoose.model('Thing', thingSchema)

module.exports = {
  Thing
}
