const bcrypt = require('bcrypt-nodejs')

const Schema = require('@daub/db-schema')

const props = require('./props')
const Account = require('./account')

const sensible = require('./sensible')

const schema = new Schema(props)

schema.plugin(sensible)

schema.loadClass(Account)

schema.plugin(Account.install)

module.exports = schema
