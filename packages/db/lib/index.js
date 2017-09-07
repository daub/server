const types = require('@daub/db-types')

const Database = require('./db')

const schemas = require('./schemas')

module.exports = new Database(schemas, types)

module.exports.Database = Database
