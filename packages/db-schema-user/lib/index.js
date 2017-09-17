const bcrypt = require('bcrypt-nodejs')

const Schema = require('@daub/db-schema')

const props = require('./props')
const User = require('./user')

const sensible = require('./sensible')

const schema = new Schema(props)

schema.plugin(sensible)

schema.loadClass(User)

schema.plugin(User.install)

module.exports = schema
